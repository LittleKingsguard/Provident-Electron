# Provident-Electron → `provident-storeroom`: the open issues at `1.4.0`

**ROUND 14. Regenerated `2026-10-29` against the installed `provident-storeroom@1.4.0`**
(`1,386,344` unpacked bytes, `21` files, `addon.version()` = `1.4.0`, `observed`).

**`1.4.0` is the first release of this package whose structural changes we would not
trade back — and one of them repaired a defect this consumer had never filed.** So this
round leads with what the release got right (§1), and only then files demands (§3). A
maintainer reading only the demand list would conclude that a release which widened a
constraint pass correctly, gave `delete` a real attempt and closed the false-pass filed at
`1.3.0` is a release under siege. It is not. Eight rows remain open; six of them are about
**words** as much as behaviour, and **none is a claim that the store ends in a state the
package cannot justify** — the two that do move the store (a silent undo and a live
message log) are about the answer, not about the state.

**Where this document and `docs/defects.md` disagree, that catalogue governs.** It holds
the long form of every row below, its four-part filing, and its dated dispositions. This
document is a **digest for the maintainer**, not a copy: it does not restate the
catalogue row-for-row, and where the catalogue carries the detail it points at the file
by path. Decision rows are cited **by name**, never by line — that ledger is appended-to
and its line anchors drift.

---

## 0. What this document is, and what it is not

**The round.** Round 14, `2026-10-29`, against `provident-storeroom@1.4.0`. Round 13 was
against `1.3.0` and its as-filed bytes are preserved **byte-exactly** at

> **`archive/handoffs/2026-10-29-HANDOFF-round-13-as-filed.md`**

(`56,410` bytes, `724` lines; the copy was `cmp`-verified against the Round-13 file as
filed, before this round opened; `RCA-8(b)` and `RCA-8(g)` are the two items that required
it). That copy is the authority for any sentence of the Round-13 text. **Nothing here
re-narrates it**, and this file is a whole-file regeneration rather than an amendment —
which is legitimate only because the as-filed bytes are already in the archive and the
archive path resolves.

**The four earlier regenerations are preserved the same way**, under
`archive/handoffs/`: `2026-10-14-HANDOFF-as-filed-before-regeneration.md`,
`2026-10-27-HANDOFF-as-filed-before-1.0.1-regeneration.md`,
`2026-10-28-HANDOFF-as-filed-before-1.2.0-regeneration.md`,
`2026-10-28-HANDOFF-as-filed-before-1.3.0-regeneration.md`.

**The labels, which are binding on every sentence below.** No sentence here rests on a
commit message, and **no commit subject is offered as evidence of anything**.

- **`observed`** — a probe was executed and its output is quoted, with the output path
  named. Never inferred, never rounded up from a reading.
- **`read`** — a citation to code, a declaration or a shipped byte, given as `path:line`.
  Evidence of what the bytes **say**, never of what they **do**.
- **`declared`** — a shipped document or a commit states it. **Never evidence of
  behaviour.** Three of this round's rows exist precisely because a shipped document says
  something the bytes do not do, and one of them (`DEF-AC`) exists because a shipped
  document still denies that a release the consumer installed **is** a release.

**Where the probe transcripts live.** Every figure and every quoted transcript stands in

> **`docs/defects-history.md` → `## provident-storeroom@1.4.0` — THE REVIEW'S MEASUREMENTS
> (filed `2026-10-29`)**

and, per row, under the `/tmp/probe-storeroom-140/out/*` paths named in §6 (with
`/tmp/probe-storeroom-142/out/*` for `DEF-AR`). The catalogue's dated `2026-10-29` `1.4.0`
block in `docs/defects.md` is the authority for every row state this document digests.

**What this document is not.** It is not a patch list against a checkout, it reports no
fix that this project applied, and it asks for nothing inside `../Provident-Storeroom`,
`node_modules/**` or any published artifact. This project **catalogues; it does not patch
the package** (`AGENTS.md` item 7). A fix that landed is recorded as a **CLOSURE**, with
the release that landed it and the code path that closes it, so that it is not re-filed.

**How the demands are ordered.** By **what each costs a consumer**, not by what each
costs the package and not by file order: a row that can hand a consumer a wrong answer
with no report comes before a row that hands a consumer a bad sentence about a right
answer. That ordering is why `DEF-AR` leads and why `DEF-AC`, which is only words, still
sits above two rows that touch behaviour. A maintainer who would rather fix in dependency
order will find §3.4 and §3.6 are the cheapest pair in the list and should simply be done
first — §2's closing note says so in one paragraph.

---

## 1. What `1.4.0` got right, and one credit we owe twice over

### 1.1 `DEF-AP` — CLOSED. Two raises are now both asked, and the commit is restored whole

**`observed`, four arms, `/tmp/probe-storeroom-140/out/ap*`, transcript in
`docs/defects-history.md` (`THE FOUR DEF-AP ARMS`).**

The `1.3.0` behaviour, re-stated because it is the measure of the repair: a raise that
came **first** — before the raise that carried the violating subject — left the write
**returning normally with the violation standing** (`read a: 5`). The overwritten raise's
watch had been taken after the violation already stood, so every address it moved went
unjudged while the surviving watch passed.

At `1.4.0`, on the same harness:

| arm | order of the two raises | asks at `[a]` | asks at `[c]` | outcome | `read a` | `read c` |
| --- | --- | --- | --- | --- | --- | --- |
| `AP.1` | `a` then `c` | `1` | `0` | `ConstraintPassRefused` | `7` | `1` |
| `AP.2` | `c` then `a` | `1` | `0` | `ConstraintPassRefused` | `7` | `1` |
| `AP.3` | violation at `c`, **lawful** raise first | `1` | `1` | `ConstraintPassRefused` | `7` | `9` |
| `AP.4` | violation at `c`, **violating** raise first | `1` | `1` | `ConstraintPassRefused` | `7` | `9` |

**Every order is refused.** Where a refusal ends the check before the second address
(`asks at [c]: 0`) the restore is still **whole** — `c` returns to `1`, the value the
pre-attempt state held, not the value the overwritten raise had moved it to. `a` returns
to `7` on all four arms. **Nothing survives unjudged on a differing-subject chain.**

**One scope sentence, and the document asks nothing on it.** The four arms use
**different subjects only**. A **same-subject double reversal is unsupported usage**:
the maintainer's ruling of `2026-10-28` — *"Double-reversing the same request is
unsupported because there's no reason to do that"* — is accepted in full, and **this
document asks nothing on it**. The sentence exists so that a later reader does not
mistake the four-arm table for a claim about a chain that reverses one op twice.

### 1.2 `DEF-W`'s residual closed at `1.3.0` — and this consumer recorded it wrong

**This paragraph is owed and is not compressible.** `DEF-W`'s residual clause read *"a
reversal inside a kernel-driven pass is not judged"*. **One harness, three installs, the
same arm** (`/tmp/probe-storeroom-140/out/i-regressions-{120,130,140}.txt`) measured the
judge asks as:

| install | in-pass (repair-body) reversal — judge asks | the harness's own verdict line |
| --- | --- | --- |
| `1.2.0` | **`0`** | `==> DEF-W: HOLDS` |
| `1.3.0` | **`1`** | `==> DEF-W: BROKEN` |
| `1.4.0` | **`1`** | `==> DEF-W: BROKEN` |

**The residual stopped reproducing at `1.3.0`.** The pair **is** asked inside a kernel
pass and the outer write is refused. The `1.3.0` review nevertheless recorded
`HOLDS — STILL TRUE (observed: 0)`, in two cells — the `DEF-W` row of the regression
table and the `DEF-W` cell of the closure index — **and both are wrong**.

**The `0` was not a lie; it was a misfiled arm.** It came from a harness arm measuring the
**`delete`-delivery window** (host 5, a declared window, §3.8), not the kernel-repair pass.
A window that is declared not to judge was read as evidence that a pass does not judge.

**So, plainly: the package was owed a closure credit at `1.3.0` and this catalogue
withheld it for one review cycle**, while the same release's guide and behaviour had
already made the row's residual false. The two wrong cells are corrected beside
themselves in `docs/defects.md` (each replaced by a one-line pointer, the as-filed bytes
kept) and stand **byte-exactly** at

> **`archive/defects/2026-10-28-DEF-W-cells-as-filed-wrong.md`**

with a retrieval copy in `docs/defects-history.md` → `## THE TWO WRONG DEF-W CELLS AS
FILED (2026-10-29)`. **A consumer that files a defect owes the same diligence to its
closures.** We record the debt here so that it is not absorbed silently into a later
round's count.

### 1.3 The `DELETE` change is real, and it is welcome

**`observed`, `/tmp/probe-storeroom-140/out/s2*`; `read` for the declarations.**
`1.3.0` invoked a pair **once** over a `delete`'s whole life, and **`0`** times for the
delete itself — a `delete` could not be refused at all. At `1.4.0`:

- **the pair is invoked twice** where `1.3.0` invoked it once — a `delete` now **opens an
  attempt, runs its own constraint pass**, and is judged by it;
- **an in-pass reversal is judged and undone** — host 6, which did not exist as a judging
  host at `1.3.0`, now returns `1` judge invocation and a refusal, with `a` back at `7`;
- **a `delete` can now be refused** — `ConstraintPassRefused` with the address restored
  (`a` = `7`), a shape the `1.3.0` probe recorded as `NOT PRESENT` because the artifact
  could not construct it;
- **the delivery fires after the judgement**, so a listener sees a **judged** state
  (`§7.8`, `README.guide.md:780-797`; `kernel-commit.mjs:257`; `constraints.mjs:912`);
- **a receipt carries a non-enumerable `commit: CommitRecord | null`** — `null` where
  nothing was removed, and the member **present** on the `D-3` arm
  (`{address, tiers: [], triggered: [], op: null, commit: null, discarded: []}`) —
  **while `Object.keys(receipt)` is unchanged at four members**
  (`["address","tiers","triggered","op"]`), the native surface is identical (`14` own
  string members, no new export, `journalMark` present), and `StoreStatus` still carries
  `20` members plus `(string & {})`.
- **`discarded`'s documentation keeps the delivery window** while withdrawing its old
  premise (`read`, `index.d.ts`) — which is the right half to keep, and which makes §3.3 a
  defect in the value the member carries rather than in the sentence that introduces it.

That is a verb made structural without a surface break, and no consumer of ours had to
change a line to keep working. **A delete that can be refused, whose refusal is a
judgement and not a bookkeeping note, is the change this consumer's `DEF-X` row has been
asking for since it was filed, and we had stopped expecting it.**

### 1.4 The widening closed a real gap, and the release's own notes declare the rule

**The gap, `observed` on both installs, `/tmp/probe-storeroom-140/out/s1b*` — and it is a
defect this consumer never filed.** At `1.3.0` a pair registered at `["settings"]` was
**not asked** for a write at `["settings","theme"]` (`ASKS=0`): the consumer wrote the
leaf `"neon"`, the write **returned** (`op=op-21`), and `read ["settings"]` read
`{"density":"compact","theme":"neon"}` — **the violating effect stood**, inside the very
object the pair existed to police. At `1.4.0` the same write is refused:

```
pair no-neon at ["settings"], refuses a theme of "neon"
(a) write ["settings"] = {...}  (the act it was authored for)   -> RETURNED op=op-20
(b) consumer writes the LEAF ["settings","theme"] = "neon"
      1.3.0: RETURNED                          read ["settings"] = {"density":"compact","theme":"neon"}
      1.4.0: THROWN ConstraintPassRefused,
             message "a theme of neon is not one this store admits",
             log [{seq:1,kind:"constraint-check",id:"no-neon"},{seq:2,kind:"outcome",state:"KC-3"}]
             read ["settings"] = {"density":"compact","theme":"slate"}
root-pair variant, write ["ledger","status"] = "BLOCKED"
      1.4.0: THROWN ConstraintPassRefused "the root guard refuses BLOCKED"   read ["ledger"] = {"open":1}
```

**The rule is declared, and in the release's own headline item.** `declared`,
**`RELEASE-NOTES.md:66`**: *"the membership rule reads once: your pair is asked when THE
ACT'S ADDRESS IS AT OR BELOW YOUR PAIR'S ADDRESS"* — and the pair *"is handed the ACT's
`address`, `tier` and `value`"*. **Say it plainly, because the previous round's successor
filing claimed otherwise: the rule IS declared, and the claim that it was undeclared was
this consumer's error and has been withdrawn** (`DEF-AS`, §5). What remains is not an
absence of declaration; it is that the **guide keeps the superseded rule standing beside
the current one** — that is `DEF-AT`, §3.6, and it is the same failure one layer down.

### 1.5 `R8` still holds, including two arms the widening newly makes possible

**`observed`, `/tmp/probe-storeroom-140/out/c-r8*`:** `0` **tier-null judge invocations
inside the kernel's unwinding, the floor reached on every arm** — now including **two new
arms over a refused descendant write** (a root/ancestor judge-at-tier-null pair watching
an act below it that the store then refused). The unwinding consults no pair. That is
`R8`, on the release that made a pair reachable in more places than it has ever been
reachable, which is exactly the release on which it was most worth re-measuring.

**All fifteen other earlier closures hold** (`observed`, the same regression harness), and
**no closure was broken by `1.4.0`**. The dated closure index in `docs/defects.md` is the
list of them; §5 below lists only the states a reader might otherwise re-file from.

---

## 2. The two structural changes, stated so the maintainer knows what we understand

Two sentences of our own, then the consequence we draw. **Both changes are correct.** §3
asks for fixes only where **the shipped behaviour and the shipped words disagree**, or
where **a report is unusable** — never against either change's design.

**(1) Membership is now prefix, and the pair is handed the act's own coordinates.**
A pair at `P` is consulted for every act whose address `A` has `P` as a prefix
(**`P ⊆ A`** — an act at or below the pair's address), not only for acts whose address
**is** `P`. The pair receives **the act's** `address`, `tier` and `value`, not its own
address and not the object that sits at its own address (`D-56`; the guide's shipped
sentence at `README.guide.md:759`; `declared` at `RELEASE-NOTES.md:66`; `observed` in the
ask matrix, `/tmp/probe-storeroom-140/out/s1-matrix*`: `write ["d","x"]` moves a pair at
`["d"]` from `0` asks to `1`, and the pair is handed `addr ["d","x"]`, `value "9"`).
Siblings are
**not** asked: `["e"]` and `["d2"]` stay at `0`, and an act at an **ancestor** of the pair
stays at `0`. **A reversal is the asymmetric half:** it hands the pair its **own**
address and the restored object — `reversal landing at ["d","x"]` shows the pair at
`["d"]` receiving `addr ["d"]`, `value "{x: {y: 1}}"`. The guide declares the first half
and not the second (`DEF-AS`'s residue, withdrawn as a defect; recorded for `DEF-AT`'s
migration note).

**(2) `delete` is an editing verb with its own attempt, its own pass, and a delivery
after the judgement.** A `delete` opens an attempt, runs its own constraint pass, and
fires its listener **after** that judgement, so **a listener sees a judged state** and
**a refused delete fires no listener at all** (`D-55` item 3; `§7.8`). The receipt carries
its own `commit` record. **Our conclusion: this is the right shape** — a verb that
changes the store is judged like the verbs that change the store, and an observer that
is told about a removal is told after the removal was judged rather than before.

**What we draw from both.** Seven of the eight open rows (§3) are about what the package
**says** — its message, its witness, its documents, its guide — and the eighth, `DEF-AN`,
is about what its refusal **omits** while the state itself follows the rule. **The store's
state is right far more often than its sentences are.** A maintainer fixing the words will
close the majority of this round's list, and we say so before we file.

**Both changes land on work this project has not yet done, and that is the last thing we
owe the maintainer in this section.** `U-STORE-CONSTRAINT-REGISTRY` is **HELD at its spec
gate** (§7), so **this consumer has not yet authored a constraint body under the widened
rule** — no registered pair of ours reads a value at a descendant act today. That makes the
migration note `DEF-AT` asks for cheap for us and expensive for anyone who shipped at
`1.3.0`, which is exactly the asymmetry a shipped document should not leave to chance.

**If only one pass is available, here is the order we would choose.** Fix the **words**
first: `DEF-AC`'s two standing sentences and `DEF-AT`'s two superseded clauses are one
editing pass and they remove two of the eight rows outright, with no behaviour change and
no risk to a passing test. Then `DEF-AH`, whose all-clear is a one-line fix in the witness.
Then the two **questions**, `DEF-AK` and `DEF-X`, which need one sentence each and no code.
**`DEF-AR` is the exception to that order**: it is the only row a hostile — or merely
careless — chain can turn into a dead process, so if the choice is made by risk rather than
by cost, it goes first and everything else waits. `DEF-AO` needs nothing new: its
disposition is already the maintainer's ruling, and what is missing is only the disclosure
clause that ruling names.

---

## 3. The open demands, ordered by severity

Eight rows, ordered by what they cost a consumer rather than by file order. **All eight are
upstream-owned and published-reachable, and each owes an upstream issue**; `DEF-AC` (3.4)
and `DEF-AT` (3.6) are documentation rows, the rest are behaviour or declaration rows. The
long form of each is in `docs/defects.md`'s `2026-10-29` `1.4.0` block; the four-part filing
below is the digest.

### 3.1 `DEF-AR` — a crossed refusal's report doubles per level, and at depth 28 the caller gets no refusal at all

**SYMPTOM / REPRO** (`observed`, `/tmp/probe-storeroom-142/out/*`; length series in
`docs/defects-history.md`, `## provident-storeroom@1.4.0 — THE REVIEW'S MEASUREMENTS`).
A constraint body edits a descendant of its own address and **stops at its own explicit
depth limit `N` — no loop, every chain terminating lawfully on its own limit**. The
refusal the caller holds then carries a `message` whose length is a function of the
chain's depth, with no bound anywhere in it:

| `N` | refusal `message` length (chars) |
| --- | --- |
| `2` | `471` |
| `10` | `6,055` |
| `12` | `13,086` |
| `16` | `137,742` |
| `20` | `2,105,598` |
| `27` | `268,447,010` |
| `28` | **no refusal at all** |

At `N = 28` the caller gets **`RangeError: Invalid string length`**, thrown from the
package's own `JSON.stringify` (`kernel-foundations.mjs:282`, inside `throwableForm`)
**inside the caller's `write` frame** (`index.mjs:397`). **No `{status, message, log}` is
delivered**, and the refused value is **left standing** (`read ["a","x","top"]` = the
refused value) — so **the safe-state rule is broken by the host error itself**.

**ROOT CAUSE** (`read`). `constraints.mjs:1275-1278` composes a crossed refusal's message
from `JSON.stringify(innerSaid)` — the inner refusal's sentence, **verbatim and quoted**.
Each level therefore re-escapes the whole of the previous level, so the composed length
**compounds with depth** instead of summarising it; the catalogue's own entry-length
series shows a **per-level ratio of `1.96–1.99`** (`observed`,
`/tmp/probe-storeroom-141/out/r7*`). **Nothing in the composition is bounded while it is
being built**, which is why the bound is finally supplied by a host implementation limit
and by an exception, rather than by the package.

**EVIDENCE.** `observed`, path above; the same class measured to a probe cap of `40` in
`/tmp/probe-storeroom-141/out/r7*`, where the body's first host throwable was
`{"ctor":"RangeError","isRangeError":true,"message":"Invalid string length"}` and a
lawful refusal at depth `~40` carried a `22003`-char message and `40` log entries; the
catalogue's own line is `docs/defects.md`, `DEF-AR`. **Exact scope: a refusal thrown to
the caller is stable** (`observed`: message and log deltas `0` after later work); the
growth is visible only because the caller **holds** the refusal.

**The growth is in the log as well as in the sentence** (`observed`, the same `r7` arm):
across a chain the probe capped at `40`, the log entries read

```
12 12 154 608 1068 1544 2052 2624 3324 4280 5748 8240 12780 21416 38244 71456 137436 …
```

chars — the same compounding, one level per entry — while **`1` of the `42` children
written under `a.x` survived the failing act**. So a deep chain does not only produce an
unreadable report: by the time the host error fires, the store is also carrying a
partly-applied act that no refusal ever named.

**FIX SHAPE.** Compose from a **SUMMARY** of the inner refusal — its `status`, the
address it refused, and a bounded excerpt of its sentence — **never from the inner
message verbatim**; and **cap the composed length while it is being built**, so that no
host `JSON.stringify` is ever what finally decides the question. **A report is not a
transcript.**

**WHAT IT COSTS A CONSUMER.** Our host cannot rely on receiving a refusal from a deep
edit. The failure mode is not a wrong state we can read back; it is **an exception of the
host platform's own making, carrying no package record, over a store that still holds the
refused value** — and it arrives exactly on the chains we deliberately bound ourselves.
We are the consumer that *did* bound the recursion, which is why this is a package
question and not the withdrawn `DEF-AQ` (§5).

### 3.2 `DEF-AO` — the client is handed a mid-commit message log, and it changes under the client

**SYMPTOM / REPRO** (`observed`, identical at `1.3.0` and `1.4.0`,
`/tmp/probe-storeroom-140/out/ao-{130,140}.txt`). A constraint body catches an inner
refused write, snapshots `.log`, and answers `true` so that the outer commit continues.
The captured log then changes:

```
AO.3  outer write k=42: RETURNED op=op-13
      the caught inner refusal .log.length AT CAPTURE: 3
      the SAME object      .log.length AFTER the commit closed: 4
      the log MUTATED after close?: true
      entry 1 AT CAPTURE: "the evaluation of body-writer"
      entry 1 NOW       : "the constraint body-writer passed at k"
      entry 4 NOW       : "every constraint registered at k passed; the commit stands"
AO.1/AO.2  a TOP-LEVEL refusal, and a delete's receipt.commit.attempt report, are STABLE
```

**The mutation changes an entry's text, not only its length** — so a consumer that logged
the entry at capture has logged a sentence the package later contradicts.

**ROOT CAUSE.** The refusal object handed into a body mid-commit carries a **live
reference** to the attempt's own message log rather than a snapshot of it. The attempt is
still open, so later frames of the same commit keep writing into the array the client is
holding.

**EVIDENCE.** `observed`, paths above; the catalogue's row is `docs/defects.md`, `DEF-AO`
(the label moved from `read` to `observed` when the arm above first drove it).

**FIX SHAPE — and it is the disposition, not a preference.** The maintainer's ruling:
*"AO - the client should not be getting a mid-commit message log."* So either **the body
receives a SNAPSHOT taken at the instant the refusal crosses**, or **the log is WITHHELD
until the commit settles** — and **whichever is chosen must be stated in the member's
declaration**, because a consumer decides its error handling on the declaration. Either
way, **the member a body receives must not be writable by a later frame of the same
commit.**

**WHAT IT COSTS A CONSUMER.** It explains why this hid for two rounds. **The scope,
`observed`: a refusal thrown to the caller is stable, and a `delete`'s `receipt.commit`
log is stable; the live handle exists only inside a commit that is still open** — that
is, only for the one kind of refusal a defensive body catches. A consumer that catches,
inspects and re-raises is reading a document that is still being written.

**What a consumer must do until this settles, stated as our practice and not as advice to
the package.** A body that catches a refusal and means to keep its log must **copy the
entries at capture** — a fresh object per entry, and `String()` on each message — rather
than hold the array it was handed. We do that today; a host that does not will find its
own diagnostics disagreeing with the package's final report about the same attempt, and
will have no way to tell which sentence was current when it decided.

### 3.3 `DEF-AH` — the discard witness reports "nothing discarded" when two raises were discarded

**SYMPTOM / REPRO** (`observed`, `/tmp/probe-storeroom-140/out/ah*`, six arms). Two
reversals raised in a `delete`'s delivery used to report
`discarded: [{opId: "op-29", addresses: []}]` — honest that something happened, silent
about what. They now report **`discarded: []`**:

| arm | `1.3.0` | `1.4.0` |
| --- | --- | --- |
| one raise in the delivery | `[]`, `a` = `5` | `[]`, `a` = `5` |
| **two raises, same window** | `[{opId:"op-29", addresses:[]}]` | **`[]`** |
| two raises, pairs at both raised addresses | `[]` | `[]` |
| two raises, a pair at only the first | `[]` | `[]` |

**Both raises' effects stand in every two-raise arm** and the witness reports **nothing
at all**. The shipped sentence it contradicts is `declared`, `README.guide.md` `§12.6`:
*"`record.discarded.length === 0` means this act's delivery discarded nothing"*.

**ROOT CAUSE** (`read`). The pending-slot bookkeeping that carries a discard into the
receipt is drained **empty** on the two-raise path: the slot holds one entry, the second
raise displaces the first, and what reaches the receipt is an empty list rather than a
list naming the raise that was thrown away. The single slot is the mechanism; the empty
report is the consequence.

**EVIDENCE.** `observed`, arms above and the catalogue's `DEF-AH` row. At `1.3.0` the
nested-write path already produced a discard whose `addresses` was **empty**
(`{opId:"op-29", addresses:[]}`); `1.4.0` removes the **entry** as well, so the report
becomes an all-clear.

**FIX SHAPE.** **Report the raise it discarded — an op id is enough; the address list may
stay empty.** An ambiguous empty case is worse than a verbose one: `[]` reads as "nothing
was discarded" in the one API whose contract says exactly that.

**WHAT IT COSTS A CONSUMER.** This is the only **worsening** of the round, and it moves in
the wrong direction on a member a consumer audits by. A host that verifies "did the
delete's delivery silently drop my listener's intervention?" now receives a **false
all-clear** in exactly the case where an intervention was dropped. We would rather be
told `[{opId:"op-29", addresses:[]}]` and have to look up the op than be told nothing and
believe it.

### 3.4 `DEF-AC` — the shipped change list still denies a release that exists

**SYMPTOM / REPRO** (`observed` for the install; `declared` for the sentences;
`/tmp/probe-storeroom-140/out/docs-h*`). The generated guards are now fixed: **both
`README.md` and the guide declare `1.4.0`**, and the guide's cut-state line now reads
`NOT STATED … (D-57)` — the guard no longer asserts a cut state the tarball is not.
**But `RELEASE-NOTES.md` still carries hand-written standing sentences that are FALSE
inside a `1.4.0` tarball**, and they are quoted here rather than paraphrased:

> *"NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT — `git tag --list` carries no v1.3.0,
> the registry carries no 1.3.0, and a consumer cannot install any of this"*

> *"1.3.0 IS THE PREPARED VERSION … it is NOT A RELEASE … no consumer can install any of
> this until the architect cuts the tag"*

**`1.3.0` IS published.** It was installed, and measured, to produce this round's
comparisons: `latest = 1.3.0`, `21` files, `addon.version()` = `1.3.0`, and the `1.4.0`
review's own `1.3.0`-contrast arms could not exist otherwise.

**ROOT CAUSE.** The cut-state guard was extended to the generated lines and **not to the
hand-written prose around them**. Two instruments — a generated line and a maintained
sentence — describe one fact, and only one of them is regenerated at publish.

**EVIDENCE.** `observed` for `addon.version()` and the install; `declared` for both
quotes, `RELEASE-NOTES.md`'s cut-state section; catalogue row `docs/defects.md`, `DEF-AC`
(narrowed, not closed — the residue is the worse half, because the generated half now
looks fixed).

**FIX SHAPE.** **Regenerate those sentences, or remove them.** A generated line saying
`NOT STATED` beside hand-written sentences asserting a cut state **is the same failure one
layer down** — and it is worse than leaving both hand-written, because a reader who sees
the guard pass believes the file has been checked. **What to put in their place:** one
generated sentence naming the version the reader is holding, one generated sentence per
release that exists but is not cut, and **nothing hand-written about tags** — then the guard
and the prose have one source and cannot drift apart.

**WHAT IT COSTS A CONSUMER.** A consumer's first act with a package is to read whether it
exists. Our own round needed an install to overrule a shipped sentence, and a maintainer
reading their own release notes would reasonably conclude that nothing since `1.2.0` has
shipped — including the two structural changes §2 describes.

### 3.5 `DEF-AN` — a successful write is undone, and no sentence says so

**SYMPTOM / REPRO** (`observed`, `/tmp/probe-storeroom-140/out/an*`). A listener writes a
lawful `["g"] = 1` — **its own commit, which `RETURNED`** — and then raises a reversal that
a pair refuses. The outer write is refused, and **`read g` → `ABSENT`**. The engine
restores **by journal position**, so work that **succeeded** goes with the refusal that
came after it. **`"g"` appears in `0` sentences of the refusal's report**: nothing the
caller receives names the address that was taken away.

**ROOT CAUSE** (`read`). `constraints.mjs:1998-2000` targets the **outermost opening's**
mark, not the failed attempt's, so a nested call that legitimately landed inside the same
commit is rolled back with it — and the refusal names only the address whose pair
refused.

**EVIDENCE.** `observed`, path above. **And the rule the release added for this is right
in its first sentence and falsified by its second** (`declared`, the `1.4.0` rule text):

> *"every edit the commit made is undone, including writes that succeeded before the
> refusal"*

> *"an edit in a DIFFERENT commit is not touched — a listener body's own write opens its
> own commit … so it is not undone by yours."*

The first sentence describes what we measured. The second is contradicted by the
measurement above: a listener body's own write **opened its own commit, returned, and was
undone anyway**. The distinction the second sentence draws is not the one the engine
makes; the engine's distinction is **journal position within the outermost opening**, and
a listener's write sits inside it.

**FIX SHAPE.** **Correct the second sentence** to state the restore's real extent — the
outermost opening's mark, whatever committed after it — **and name in the refusal what it
took**: the addresses the restore moved that the refused act did not itself write. A
consumer can survive an undo it is told about; it cannot survive one it is not.

**WHAT IT COSTS A CONSUMER.** The ruling this consumer already accepts is
`A-THROW-MUST-MEAN-NOTHING-LANDED`, and it is honoured — nothing of the refused act's own
effect stands. What is **not** honoured is the consumer's ability to know what else went
with it. Our host treats a returned write as durable; a returned write inside a later-
refused commit is not, and the answer is silent about it.

### 3.6 `DEF-AT` — the guide keeps superseded rules standing in place, so two sections tell a reader the opposite of the shipped behaviour

**SYMPTOM / REPRO** (`read` for the bytes; `observed` for the behaviour each falsifies;
`/tmp/probe-storeroom-140/out/docs-h*` and `s1-matrix*`).

1. **`README.guide.md:814-816`** — *"a pair at an ANCESTOR address is not asked by the
   delete's pass"* — is the **pre-`D-56`** rule. The shipped behaviour is the opposite:
   an ancestor pair is asked (`observed`, `ASKS=1`), and the guide's own `:759` states the
   prefix rule that requires it.
2. **`README.guide.md:1574`** — *"NO SHAPE AT THIS VERSION ADMITS ONE"*, about a raise
   inside a `delete`'s pass — is the **pre-`D-55`** state, contradicted by the same
   document's `§7.8` (`:780-797`), by `kernel-commit.mjs:257` and by
   `constraints.mjs:912`, and falsified by measurement (pair invocations during the
   delete: `0 → 1`).

**ROOT CAUSE.** Two sections written about different releases now ship together. The
widening and the `delete` change moved the behaviour; **neither superseded clause was
regenerated or retired**, and neither cross-references the clause that replaced it.

**EVIDENCE.** `read` for all four line anchors; `observed` for both falsifying arms;
catalogue row `docs/defects.md`, `DEF-AT`. **The current rule IS declared** — at
`README.guide.md:759` and in `RELEASE-NOTES.md:66` — **so the failure is retention, not
absence**, which is why this row is a documentation demand and not a behaviour one.

**FIX SHAPE.** **Move the superseded bytes out to the archive with a one-line pointer,
and keep the standing sentence alone** (this project's own `RCA-8(g)` practice: retention
**and** retrievability, never retention in place). And **add a migration note**, because
the widening has a consumer-side consequence the documents do not state: **a body
authored to read the object at the pair's own address (`ctx.value.theme`) now misreads at
a descendant act and passes silently** (`observed`, `s1b`: a pair shaped that way returns
`op=op-25` and the leaf `"neon"` lands — the pair that exists to refuse the object shape
admits it, because it is handed the act's primitive).

**WHAT IT COSTS A CONSUMER.** A reader who follows `:814-816` or `:1574` will write a
constraint that does not fire, or conclude that the shape they need does not exist. And a
reader who keeps their `1.3.0` body will find it **passing when it should refuse** — the
worst consumer outcome there is, because nothing reports it. **The cost is asymmetric on
purpose, and it is worth naming:** a body that refuses too much is loud and gets fixed in a
day, while a body that refuses too little is silent for as long as nobody writes the act
that would have been caught. Every consumer who shipped a pair at `1.3.0` is now in the
silent half, and only the guide can tell them so.

### 3.7 `DEF-AK` — narrow: only the throwable's identity stays outside the refusal

**SYMPTOM / REPRO** (`observed`, `/tmp/probe-storeroom-140/out/` AK arms; transcript in
`docs/defects-history.md`, `### THE DEF-AK BEFORE / AFTER`).

```
1.3.0  outer message: "... a constraint body's throwable crosses as this refusal"
       marker-AK: 0 occurrences
1.4.0  outer message: "... the value the constraint body threw does NOT cross as this
                      refusal: the form the throwable took stands in the `outcome` entry
                      of this refusal's `log`, which is where a throwable's own message
                      crosses"
       log[0] (kind outcome): "the constraint marker-thrower threw; the attempt is closed —
                      the value it threw was an object whose own `message` member is the
                      string \"marker-AK\""
       marker-AK crosses now: YES (in that entry, never in `message` or `status`)
       a body-RETHROWN package refusal: the full inner refusal under
                      Symbol(provident-storeroom.inner-refusal), its status AND message
                      AND log also quoted in the outer `message`
```

**ROOT CAUSE.** Not a contradiction any more: the message that claimed a conveyance the
bytes denied **has been rewritten to state the limit correctly**, and a body's own
`Error` now crosses as its **`message`** in an `outcome` log entry. What does not cross is
the throwable's **identity** — its constructor, its own members, its shape.

**EVIDENCE.** `observed` and `read`, transcript above; catalogue row `docs/defects.md`,
`DEF-AK`.

**FIX SHAPE.** **None proposed.** The contradiction the row named is **CLOSED**, and this
round asks **one question** rather than filing a demand: **should the throwable's identity
cross, or is the message-only crossing the intended ceiling?** If the answer is "intended",
the row narrows to a recorded limit and no further pass files it.

**WHAT IT COSTS A CONSUMER.** Little, now. A host that discriminates error classes by
`instanceof` gets a message and no class, so it must match on text — a cost we can absorb
and would rather not build policy on. The question is asked because the declaration is the
place to settle it, not because a state is wrong.

### 3.8 `DEF-X` — we are proposing to close it

**SYMPTOM / REPRO** (`observed`, `/tmp/probe-storeroom-140/out/b-defx7*` and `s2*`). Seven
hosts, each a place a reversal can be raised. At `1.4.0`:

| host | what it is | judge invocations |
| --- | --- | --- |
| `1` | a top-level reversal | `1` |
| `2` | a reversal inside a `write`'s own commit | `1` |
| `3` | a reversal from a repair body | `1` (effect gone, `7` held) |
| `4` | a registration's evaluation | `0` — **the guide's declared window** |
| `5` | a `delete`'s listener delivery | `0` — **the guide's declared window** |
| **`6`** | **a `delete`'s constraint pass — NEW at `1.4.0`** | **`1`** |
| `7` | a reentrant reversal-then-write | `1` (`7` held) |

**Five hosts judge. Hosts `4` and `5` are the guide's two declared windows, now named at
`README.guide.md:1521-1523`, and they are defined by the delivery, not by the verb.** Host
`6` did not merely change its answer: at `1.3.0` the probe could build **no** constraint
pass on a `delete`'s behalf (`NOT PRESENT`), so the `1.3.0` measurement of host 6 was a
measurement of a shape the artifact did not admit — **a doubt about our own row**, which
this release resolved by making the shape exist and judging it.

**Zero unjudged hosts remain.** Every host that runs a pass now drains its own restart
request and judges; the only two that do not judge run **no pass**, and the guide says so
in its own name.

**And nothing is asked on the two declared windows.** Hosts `4` and `5` are declared,
named and measured as not judging; **this document attaches no demand to either of them**,
and a later round that files on one is filing against a ruled state, not against a defect.

**ROOT CAUSE.** None outstanding. The `1.3.0` residue was a host count, and the count is
now explained rather than merely reduced.

**EVIDENCE.** `observed`, rows above; catalogue row `docs/defects.md`, `DEF-X`, whose
`1.3.0` state — one host unjudged on the `1.2.0` measurement, its reachability at `1.3.0`
unproven either way — this release retires.

**FIX SHAPE — one question, and it closes the row.** **After `D-55` a `delete` runs its own
pass: is the delivery's placement OUTSIDE that pass still intended, or is a raise inside a
`delete`'s delivery meant to be judged now?** The delivery follows the judgement; the
question is whether the judgement now reaches what the delivery does. **On an answer of
"intended", this row CLOSES as designed behaviour** — not as a defect withdrawn, but as a
window declared, named and honoured — and this consumer will record it as such in the
round that follows.

**WHAT IT COSTS A CONSUMER.** One sentence of policy, and we can write it either way. What
we cannot write is a policy on an undeclared window: a host must know whether an
intervention from a listener's delivery is inside or outside the machinery, because that
determines whether it must do its own verification. `1.4.0` has made this cheap to settle.

---

## 4. The two observations — **explicitly NO DEMAND**

**Nothing is asked on either row. There is no fix shape, no upstream issue and no
round item. They are recorded so that the numbers are on the record once, in one place,
and so that no later pass re-derives them as a finding.** `DEF-AM` is declared in the
shipped declarations; `DEF-AD` is a characteristic of the model rather than a claim about
it; and this consumer has accepted both costs.

**`DEF-AD` — the read cost of the constraint machinery** (`observed`,
`/tmp/probe-storeroom-140/out/h-defad*`):

| measure | `1.2.0` | `1.4.0` |
| --- | --- | --- |
| native reads, `200` permitted at-rest reversals | `140,300` | `140,300` (`701.5` each, `3.5` per address) |
| native reads, `200` refused reversals | `200,800` | `200,800` (`1,004` each) |
| `readLiteral` calls | `0` | `0` |
| heap per registered pair | `4,915` B | `4,953` B (`+14`) |
| unpacked tarball | `1,149,852` | `1,386,344` (`21` files) |

**No read-count regression between `1.2.0` and `1.4.0`.** The cost is characteristic of the
model, not of a regression, and no narrowing suggestion is filed as a demand.

**`DEF-AM` — the witness's `addresses` length is correct and the member is
non-enumerable** (`observed`, `/tmp/probe-storeroom-140/out/i-defam*`): `addresses.length`
is **`1`** at `1`, `3` and `25` registered pairs (it was the whole registry — `200`
addresses, `1,721` bytes — at `1.2.0`), and the member is `{writable:false,
enumerable:false, configurable:true}`, so it is **lost by spread, by `Object.assign`, by
`JSON.stringify` and by `structuredClone`**. The `1.4.0` receipt's new `commit` member
**uses the same device** (`enumerable:false`, `Object.keys` unchanged at four) — stated
here because a consumer that serialises a receipt should know it drops both members, and
because that consistency is a deliberate choice rather than two accidents.

---

## 5. Closed, withdrawn and never to be re-filed — read this before re-reading an older round

**This table is here to save the maintainer's time.** Every row below has been filed, and
its state has moved. Re-reading an older round and re-filing from it is the single most
expensive failure available to this process, and it has happened once (`DEF-W`, §1.2).

| row | state | where it stands |
| --- | --- | --- |
| `DEF-AP` | **CLOSED at `1.4.0`** | §1.1; four arms, different subjects only; the same-subject double reversal is **unsupported usage** and nothing is asked on it |
| `DEF-W` | **residual CLOSED at `1.3.0`** | §1.2; **credit owed, and our error**; the wrong cells stand at `archive/defects/2026-10-28-DEF-W-cells-as-filed-wrong.md` |
| `DEF-AQ` | **WITHDRAWN `2026-10-29`** | a caller that makes **unconditional edits to its own sub-properties** is responsible for its own infinite loop; **the package owes no depth guard**. The observation **stands and is not retracted**: no cap, the host dies of heap exhaustion, `exit 134`, `SIGABRT`, no `{status, message, log}` delivered — **the prevention is the caller's** |
| `DEF-AS` | **WITHDRAWN `2026-10-29`** | the widened pass is **correct** and the `1.3.0` exact-address pass **was the defect**; the claim that the rule was undeclared was ours and is withdrawn (§1.4). What survives is the guide's retention of the old rule, filed as `DEF-AT` (§3.6) |
| `DEF-R` | **WITHDRAWN — not reproduced at either version** | the reorder never reproduced, at the version that filed it or any other; `1.0.1` then minted `registrationSeq` and sorted by it, so the ask was met by a defect that was not real |
| `DEF-T` | **RE-SCOPED** | the filed "two spellings" claim did not reproduce and is withdrawn; what stands is four observed spellings across the fourteen members — a diagnostic, not a demand |
| `DEF-V` | **NARROWED to a diagnostic wish, no demand** | the refusal is correct by the package's own record; what survives is a preference about its message, recorded as a wish and filed as nothing |
| `DEF-O` | **WITHDRAWN** | a mis-filing by this catalogue: the constraint-register reader is **not** a substitute for a commit register, because **the package was right not to publish one** (see the `COMMIT-REGISTER-…` ruling below) |
| `DEF-I`, parameter half | **WITHDRAWN** | the op id **is** the lawful reversal parameter (ruling `OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`); only the unjudged-window half was ever live, and it is `DEF-X` (§3.8) |

**And the standing rulings this consumer has accepted, stated so that no later pass
re-argues them.** Each is a decision row in
`docs/decisions/ACTIVE-store-and-package-binding.md`, cited by name:

1. **The op id is the correct reversal parameter** — `OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`.
2. **There is no public commit register, and none is asked for** — the register is a
   **mid-flight, JS-thread structure, empty at rest**
   (`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`). A consumer that
   wants durability reads the store, not a register.
3. **The instance-lifetime retention model is correct**
   (`INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`): a constraint's lifetime is the store
   instance's, so the instance's own collection **is** the deletion site and **is** the
   bound. **No cap, no deletion site and no declared figure is asked for.**
4. **No version number is a defect** (`VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`): a
   package may ship any number of behaviour changes under any number; a consumer's
   remedy is a pin, not an issue. This document grades no arithmetic and names no bump.
5. **Execution is sequential** — a listener's or constraint's own write enters through the
   package surface and restarts constraint checking so that prior constraints still pass;
   single-threaded JS makes it sequential, **so two raises are never in flight at once and
   no race exists**. Any wording in an older round that implied concurrency was this
   consumer's, not the artifact's.
6. **A restart request exists so that prior constraints still pass** — and it belongs to
   the window that raised it. That is the mechanism behind §3.8, not a defect in itself.

**Nothing in §3 contradicts any line above**, and a demand that would have is not filed:
see §7's closing note.

**This list is complete for the states a reader can re-file from.** Rows closed before
`1.0.1` are **not** listed here — the dated closure index in `docs/defects.md` carries
them — and a row that appears in neither this table nor that index is a row this consumer
has never filed. **The `1.2.0`–`1.3.0` closure set is deliberately absent from the table
above**: `DEF-AE`, `DEF-AI`, `DEF-AJ`, `DEF-AL`, `DEF-AB`'s `seq` half, and the two
`STOREROOM-*` rows closed on measurement. None of them can be re-filed from an older round
without contradicting a shipped declaration that now exists, so they are pointed at rather
than restated; a reader who needs their reasons wants the closure index, not this digest.

---

## 6. Reproduction index

**The transcripts live in `docs/defects-history.md` → `## provident-storeroom@1.4.0` — THE
REVIEW'S MEASUREMENTS (filed `2026-10-29`)**, which is the retrieval surface for every
figure quoted here. The probe output directories are named per row; `1.4.0` was unpacked
at `1,386,344` bytes over `21` files, and `addon.version()` answered `1.4.0`.

| row | probe / output path | what to look for |
| --- | --- | --- |
| `DEF-AR` (§3.1) | `/tmp/probe-storeroom-142/out/*`; cap-firing series `/tmp/probe-storeroom-141/out/r7*` | the length series per `N`, then the `RangeError` at `N = 28` and `read ["a","x","top"]` |
| `DEF-AO` (§3.2) | `/tmp/probe-storeroom-140/out/ao-{130,140}.txt` | `log.length` `3 → 4`, and entry 1's rewritten text |
| `DEF-AH` (§3.3) | `/tmp/probe-storeroom-140/out/ah*` | the six arms; `AH.2`'s `[]` against `1.3.0`'s `[{opId:"op-29", addresses:[]}]` |
| `DEF-AC` (§3.4) | `/tmp/probe-storeroom-140/out/docs-h*` | `README.md`'s version, the guide's `NOT STATED … (D-57)` line, and the two `RELEASE-NOTES.md` sentences |
| `DEF-AN` (§3.5) | `/tmp/probe-storeroom-140/out/an*` | the listener's `["g"]=1` returning, then `read g` → `ABSENT` |
| `DEF-AT` (§3.6) | `/tmp/probe-storeroom-140/out/docs-h*`, `s1-matrix*`, `s1b*` | the four line anchors; ancestor-pair `ASKS=1`; the `ctx.value.theme` body passing silently |
| `DEF-AK` (§3.7) | `/tmp/probe-storeroom-140/out/` (AK arms) | the before/after message pair and `log[0]`'s `outcome` entry |
| `DEF-X` (§3.8) | `/tmp/probe-storeroom-140/out/b-defx7*`, `s2*` | the seven hosts; the `delete`-pass arm going `NOT PRESENT → 1` |
| `DEF-AP` (§1.1) | `/tmp/probe-storeroom-140/out/ap*` | the four arms, their ask counts, and the whole restore |
| `DEF-W` (§1.2) | `/tmp/probe-storeroom-140/out/i-regressions-{120,130,140}.txt` | the three `==> DEF-W:` verdict lines and the ask counts `0` / `1` / `1` |
| `R8` (§1.5) | `/tmp/probe-storeroom-140/out/c-r8*` | `0` tier-null invocations, floor reached, the two new descendant-refusal arms |
| `DEF-AD` / `DEF-AM` (§4) | `/tmp/probe-storeroom-140/out/h-defad*`, `i-defam*` | the read counts, the heap per pair, the `addresses.length` at `1` / `3` / `25` pairs |
| matrix + declarations (§2) | `/tmp/probe-storeroom-140/out/s1-matrix*`, `s1c*`, `docs-h*` | the ask matrix, the `index.d.ts` diff, and the `1.4.0` surface |

**Comparison installs.** Every `1.3.0`-contrast arm in §1 and §3 was produced on the same
harness against an installed `1.3.0` (`/tmp/probe-storeroom-130/`) and, where a three-
install series is quoted, against `1.2.0` as well.

**A maintainer can re-run any row above without this project's harness.** Each row names
the install it was taken on, and the act sequence is printed verbatim in the history
file's transcript; every arm drives the package through published members (`write`
`delete` `rollback` `addConstraint` `listen`), so **no row depends on this project's host
code or on the Electron shell**. That is a property of the probe design, not a claim about
the package: a row that could only be reproduced through a consumer's own layer would not
be filed as an upstream defect.

---

## 7. What we owe, and when

**This round's ledger of work, printed with its terms:** **`1` closure** (`DEF-AP`) +
**`1` closure credit we owed** (`DEF-W`, and the accompanying self-correction) + **`4`
narrowings** (`DEF-X`, `DEF-AK`, `DEF-AC`, `DEF-AN`) + **`1` worsening** (`DEF-AH`) +
**`1` confirmation** (`DEF-AO`, whose label moves from `read` to `observed` now that an arm
has driven it) + **`2` withdrawals** (`DEF-AQ`, `DEF-AS`) + **`2` observations** (`DEF-AD`,
`DEF-AM`, both no-demand) — **every term above is a row this document names**, and the long
form of each is in `docs/defects.md`.

**The ledger of units is unmoved: `33 DONE / 3 open` units = `36`**, with `41` live rows in this consumer's count — the same figure
`docs/defects.md`'s `2026-10-29` tally prints — of which **EIGHT carry a demand** (§3),
**TWO are observations with no demand** (§4), and the rest are closed or withdrawn
records kept so no later round re-files them (§5). **`U-STORE-CONSTRAINT-REGISTRY` remains HELD at its spec gate with
`C-5` open**, and **no unit was admitted for any row in this document** — a defect filed
upstream is not work admitted here, and this round admits nothing.

**What the maintainer can expect from us, in order:** an upstream issue per row in §3,
each carrying the four-part filing and the reproduction path; the `DEF-AO` and `DEF-X`
questions asked as questions and not as demands; the two observations of §4 recorded once
and not re-filed; and, when a release answers any row above, a **closure recorded with the
release that landed it and the code path that closes it** — including, where we owe it, a
public correction of our own catalogue.

**One note on what this round did not do.** Two demands were considered and **not filed**,
because each would have contradicted a ruling in §5: a request for a **bound or eviction
on the retained constraint registry** (contradicts ruling `3`, the instance-lifetime model)
and a request for a **readable commit register** (contradicts ruling `2`). Both remain
observations at most, and neither is re-argued here.

**And three things this document will not do, so that no later round expects them of us.**
It will not re-file a row in §5; it will not grade a version number (ruling `4`); and it
will not ask for a bound on a structure whose lifetime is the instance's (ruling `3`). A
future round that does any of the three is repeating work this one has already recorded as
settled — and the one time this process did exactly that, it cost the package a closure
credit it had earned (§1.2).
