# Provident-Electron → `provident-storeroom`: the open issues at `1.5.0`

**ROUND 15. Regenerated `2026-10-29` against the PUBLISHED `provident-storeroom@1.5.0`** —
`latest`, `modified 2026-10-28T21:20:37.094Z`, `unpackedSize 1,520,345` over the **same `21`
files** (`observed`, `/tmp/probe-storeroom-150/out/docs-h-150.txt` `H0`: `file count: 21`,
`sum of file bytes: 1520345`). `1.4.0` was `1,386,344` — so this release is **`+134,001` bytes
of text and not one new file**. `addon.version()` answers `1.5.0` and the platform package
reads `1.5.0` (`observed`, `i-regressions-150.txt` `I13`).

**`R8` HOLDS — AND IT IS SAID FIRST, BEFORE ANY DEFECT.** Six adversarial arms
(`observed`, `c-r8-150.txt`): **`0` tier-null judge invocations inside the kernel's
unwinding on every arm, and the per-op floor reached on all six.** `C1`–`C4` each read the
pre-attempt value `5` back at `["a"]` after the refusal; `C5` and `C6` read `1` back at
`["a","x"]` on the two arms the `1.4.0` widening newly makes possible (a root judge-at-
tier-null pair, and an ancestor one, over a refused **descendant** write). Six arms rather
than Round 14's four. **A release this large could have broken this invariant silently, and
did not; the maintainer should read that before reading anything below.**

**THE SURFACE KEEPS ITS COUNT, AND LOSES EXACTLY ONE DECLARATION.** `14` own string members,
**name-for-name and arity-for-arity, empty diff** (`observed`, `surface-150.txt` against
`surface-140.txt`); `StoreStatus` `20` members + `(string & {})` (`read`,
`index.d.ts:316-337`); `LogEntry.state`'s domain `KC-1`…`KC-9`; the `{status, message, log}`
form unchanged; **`journalMark` still a native export** (`observed`, `surface2-150.txt` `G`:
`native journalMark: function` — and still not a namespace member, `ns.journalMark:
undefined`); `register/2` still registers and still delivers (`observed`, `surface2-150.txt`
`D`). Two instance Symbols are new (`bump-mark`, `register-body`, `8 → 10`,
`surface-{140,150}.txt`), both non-enumerable and outside the census. **The one declaration
that left is `LogEntry.seq`** — §1.3, and it is the only breaking delta in this release.

**Six rows carry a demand (§2) and two are observations with no demand (§3).** Round 14
carried eight demands; **two of them are closed at `1.5.0` and one has narrowed to half of
itself.** That is the direction this consumer wants to keep reporting.

**Where this document and `docs/defects.md` disagree, that catalogue governs.** It holds the
long form of every row, its four-part filing and its dated dispositions; the `1.5.0` block
dated `2026-10-29` is the authority for every row state digested here. This document is a
**digest for the maintainer**, not a copy: it does not restate the catalogue row for row, and
where the catalogue carries the detail it points at the file by path. Decision rows are cited
**by name**, never by line — that ledger is appended-to and its line anchors drift.

---

## 0. What this document is, and what it is not

**The round.** Round 15, `2026-10-29`, against `provident-storeroom@1.5.0`. Round 14 was
against `1.4.0` and its as-filed bytes are preserved **byte-exactly** at

> **`archive/handoffs/2026-10-29-HANDOFF-round-14-as-filed.md`**

(`53,288` bytes, `825` lines, `cmp`-verified against the as-filed file before this round
opened; `RCA-8(b)` and `RCA-8(g)` are the two items that required the copy). **That path is
the authority for any sentence of the Round-14 text.** This file is a **whole-file
regeneration**, which is legitimate here for one reason only: the as-filed bytes are already
in the archive, the archive path resolves, and the live document does not carry superseded
text beside its successor.

**The earlier regenerations are preserved the same way** under `archive/handoffs/`, from
`2026-10-14-HANDOFF-as-filed-before-regeneration.md` through
`2026-10-29-HANDOFF-round-13-as-filed.md`.

**The `1.3.0` review block** — the record that carries the `1.3.0` measurements themselves,
which no later block re-runs — stands **byte-exactly** at

> **`archive/defects/2026-10-29-1.3.0-review-as-filed.md`**

and is **superseded as a statement of any row's current state**, which the `1.4.0` and
`1.5.0` blocks carry against installed bytes.

**The labels, which are binding on every sentence below.** No sentence here rests on a commit
message, and **no commit subject is offered as evidence of anything**.

- **`observed`** — a probe was executed and its output is quoted, with the output path named.
  Never inferred, never rounded up from a reading of code.
- **`read`** — a citation to code, a declaration or a shipped byte, given as `path:line`.
  Evidence of what the bytes **say**, never of what they **do**.
- **`declared`** — a shipped document or a commit states it. **Never evidence of behaviour.**
  Three of this round's rows exist precisely because a shipped document says something the
  bytes do not do, and one (`DEF-AC`) exists because a shipped document still denies a cut
  release that a consumer can install.

**Where the probe transcripts live.** Every figure and every quoted transcript stands in
**`docs/defects-history.md`** — the transcript archive for this catalogue — and, per row,
under the `/tmp/probe-storeroom-150/out/*` paths named in §5. The `1.4.0` comparison re-ran
**the same scripts** from `/tmp/probe-storeroom-150b/` (`package.json` version `1.4.0`,
`observed`); its outputs carry the `-140` suffix in the same directory.

**What this document is not.** It is not a patch list against a checkout, it reports no fix this
project applied, and it asks for nothing inside `../Provident-Storeroom`, `node_modules/**` or
any published artifact: this project **catalogues; it does not patch the package** (`AGENTS.md`
item 7). A fix that landed is recorded as a **CLOSURE** — with the release that landed it and
the code path that closes it — so that it is never re-filed.

**How the demands are ordered.** By **what each costs a consumer**: a row that can hand a
consumer a value in a state the package calls unsafe comes before a row that hands it a wrong
sentence about a right answer. Hence `DEF-AR` first, and `DEF-AC` — only words — last.

**One correction of address.** Round 14 said the guide declares its two unjudged windows at
`README.guide.md:1521-1523`. **At `1.5.0` the guide was re-cut and those sentences stand at
`README.guide.md:1920-1927`** (`read`, §12.6b, headed *"The two known fail-states, and how you
leave them"*). The `1.4.0` anchor is cited nowhere below.

---

## 1. What `1.5.0` got right

**This section is not a courtesy paragraph.** Two of the rows this consumer filed and then
watched for two rounds are **closed**, one is closed by an edit this consumer would not have
dared propose, and the invariant we care about most held on a release that touched `134,001`
bytes of text. A maintainer reading only §2 would conclude that a release which repaired a
false declaration, gave a listener's throw its own identity, kept `R8` through two new arms
and **dropped a member rather than keep it lying** is a release under siege. It is not.

### 1.1 `DEF-AN` — CLOSED. A listener's lawful write now survives the caller's later refusal

**`observed`, `an-150.txt`; the `1.4.0` arm is `an-140.txt`.**

The `1.4.0` behaviour, re-stated because it is the measure of the repair: a listener wrote a
**lawful** `["g"] = 1` inside its delivery; the *caller's own* write was then refused for an
unrelated reason; and the lawful write was **undone with the commit** — `read g` answered
`ABSENT`. The declaration the package added for it said every edit the commit made is undone,
which was **true as written and false as meant**: the listener's act was lawful, judged, and
taken anyway.

At `1.5.0`, the same arm:

```
the in-listener lawful write g=1:   RETURNED op=op-4
the outer write b=1:                REFUSAL  ConstraintPassRefused
read g  (1 => survived, ABSENT => undone):  VALUE 1
read a:                             VALUE 7
```

**The lawful write survives**, and it survives because the restore baseline moved: it is now the
**LAST VALIDATED MARK** rather than the commit's opening mark. **And the refusal says so in its
own message**, verbatim from the same run: *"the baseline this verdict measured is the
pre-reversal standing, which is the state the LAST VALIDATED MARK holds: the position the commit
cached at its opening, moved forward by every constraint sweep that has passed since"*. A rule a
consumer can read out of the answer it was handed is the standard this project asks for, and this
release met it.

**What does not move, said so the credit is not read as larger than it is:** no sentence in
any refusal names `g` (`observed`, `an-150.txt`: `any sentence naming 'g'?: []`). The
consumer's remedy is still to read its own addresses back. What changed is that the read now
answers the value the consumer wrote.

### 1.2 `DEF-AK` — CLOSED. A listener's throw crosses to the original caller with its identity

**`observed`, `g-defak-150.txt`, `p-d71-150.txt`; `i-regressions-150.txt` `I9` re-confirms it
from the regression harness.**

Two halves, both closed:

1. **A constraint body's own `Error` crosses as its `message`.** `g-defak-150.txt` `G3`: the
   body throws `new Error('marker-AK')`, the caller receives `ConstraintBodyThrew`, and
   `marker-AK` is present — carried where the declaration says it will be, in the `outcome`
   entry of the crossed refusal's `log` (*"the value it threw was an object whose own
   `message` member is the string \"marker-AK\""*). A body that throws an **inner refusal**
   uncaught gets the stronger treatment (`G4`): the inner refusal crosses **beside** the
   crossed one under `Symbol.for('provident-storeroom.inner-refusal')`, with its own log, and
   the crossed sentence says exactly that in its own words.
2. **A listener's throw now crosses to the original caller with IDENTITY PRESERVED.** The
   `1.4.0` behaviour swallowed it. At `1.5.0` (`p-d71-150.txt`):

   ```
   ARM (i)  the listener body throws its own Error("L-OWN-ERROR")
            the caller's write answer:  THREW Error  msg="L-OWN-ERROR"  own=["stack","message"]
            identity preserved (thrown === the listener's own Error)?  true
            read a (1 => the write LANDED):  VALUE 1
   ARM (D-73 depth)  a throw two delivery windows down:
            identity preserved at the original caller?  true
   ```

   `thrown === the listener's own Error` is `true`, and `true` again across **two** delivery
   windows. The caller can key its own diagnostics on a value it minted itself. That is a
   surface a host can build an error policy on.

**The asymmetry between the two — a body's throw crosses converted, a listener's throw
crosses as itself — is DECLARED as the design**, and the hazard it creates is declared too.
**`README.guide.md:762`**, verbatim: *"THE WRITE'S DATA LANDED AND ITS ANSWER DID NOT — SO A
BLIND RETRY RE-APPLIES A WRITE THAT ALREADY SUCCEEDED"*. **This paragraph is credited
explicitly**: it states the consequence in the consumer's own terms (`try { write } catch {
retry }` runs the write twice), it says what to write instead, and it does not pretend the
asymmetry is uniform. **It is the kind of declaration this consumer asks for**, and it is
worth more than a fix here would be, because a host that reads it will not build the bug.

### 1.3 `DEF-AI` — CLOSED BY SUBTRACTION. `LogEntry.seq` is gone, and that is a BREAKING delta

**`observed`, `d-seq-150.txt`, `ef-decl-150.txt`; `read`, `index.d.ts` (`- readonly seq:
number;` removed from `LogEntry`, `D-65`: *"Drop it"*).**

The row was filed at `1.3.0` and narrowed at `1.4.0`: the log entry carried an ordinal that
could disagree with the journal's own. At `1.5.0` the member **no longer exists**:

```
every log[] entry's seq: [{seq: undefined, kind: "constraint-check", id: "no-five"}]
JUDGEMENT-TIME THROW:    [{seq: undefined, kind: "constraint-check", id: "thrower"}]
REFUSED WRITE, FAILING REPAIR: 3 entries, all seq: undefined
```

The position is the array index. **The declared member list is five** (`ef-decl-150.txt`
`E0`: `kind` · `id` · `message` · `opId` · `state`), and the key is **absent** from an entry
the write path built (`E1`: `keys=["kind","id","opId","message","state"]`) while a crossed
body-throw entry prints it as `undefined` (`g-defak-150.txt` `G4`: `"seq": undefined`) — the
same value either way, with one shape difference we note and do not file.

**State the consumer-visible consequence honestly: THIS IS A BREAKING DELTA FOR ANY CONSUMER
THAT READS `.seq`, AND IT SHIPPED IN A MINOR.** A `1.4.0` consumer that numbered its own
diagnostics from `log[i].seq`, keyed a map by it, or asserted `typeof entry.seq === 'number'`
will see `undefined` at `1.5.0` with no other signal. **We are not complaining about the
version number** — that is ruled (`VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`, §4) — and we
file nothing on it. We are telling the maintainer what a `1.4.0` consumer will hit on the
morning it upgrades, because a change list that said *"the member is gone"* would save every
one of them an afternoon, and `RELEASE-NOTES.md`'s `1.3.0` section still points the other way
(`observed`, `docs-h-150.txt` `H1`: *"`1.3.0`: `seq` is the commit log's ordinal (DEF-AI): 1
line(s)"*).

**The closure itself is the right call, and we say so:** a field that could not be made to
mean one thing at every host was not made to mean one thing — it was deleted, and the index
it duplicated is exact. `DEF-AB`'s `seq` half closes with it, which is why §4 lists that half
as closed rather than withdrawn.

### 1.4 `DEF-AR`'s message no longer pre-empts the refusal — half of the row, and the log half

**`observed`, `p-defar-150{a,b,c}.txt`, `n28-150.txt`; the `1.4.0` comparison is
`p-defar-140a.txt`, `n28-140.txt` in the same directory.**

At `1.4.0` the top of this row read: on a **lawful, terminating** edit chain that stops at the
caller's own depth limit `N`, the composed refusal message exceeded the host's string limit
and the caller received **no refusal at all** — `RangeError: Invalid string length` from the
package's own `JSON.stringify`, raised inside the caller's `write` frame. At `1.5.0`, `N = 28`
answers:

```
answer: ConstraintBodyThrew   messageChars: 307   logEntries: 29
longestLogEntryChars: 268446684
stateAfter: ABSENT · VALUE 1 · ABSENT
```

**A refusal is delivered where none was.** That is real, and it is the half that mattered
most, because a host error with no package record inside a caller's frame is the one failure
mode this consumer cannot defend against. The log half is filed in §2.1 with the numbers.

**And the exact sense in which the message is bounded is worth one sentence**, because a
maintainer will otherwise over-read the credit: at `N = 26` the same harness reads a
`268,446,999`-char message, so below the host's ceiling the composition still grows with depth
and **no length policy is applied**. What changed is that the ceiling no longer decides the
outcome: the caller gets the package's own `307`-char sentence instead of a host exception.

### 1.5 `D-67` measured: the listeners widened with the pass, and `triggered` names the act

**`observed`, `p-d67-150.txt`.**

A listener standing at `["d"]` is delivered for a write **at** `["d","x"]` and for a `delete`
at `["d","x"]`, and the record's `triggered` list names **the act's** address rather than the
listener's:

```
(ii)  a write at the DESCENDANT ["d","x"] = 5
      LISTENER deliveries: 1 ["[\"d\", \"x\"]"]     PAIR asks: 1 addr ["d","x"] tier "mem"
(iii) a DELETE at the descendant ["d","x"]
      LISTENER deliveries: 1 ["[\"d\", \"x\"]"]     PAIR asks: 1 addr ["d","x"] tier null
```

**There is no listener/pass asymmetry left for an act at or below the pair's address**: the
two widenings arrived together, and `D-67`'s question is answered by measurement rather than
by a reading of a declaration. A listener at `["d"]` is no longer the narrower of the two
observers, which removes an asymmetry this consumer had written into its own notes as a thing
to test around.

### 1.6 `R8` holds — six arms, `0` tier-null invocations, the floor reached on all six

**`observed`, `c-r8-150.txt`** — restated from the head of this document, because this belongs in
the credit and not only in the summary.

| arm | what it plants | tier-null invocations | the read-back |
| --- | --- | --- | --- |
| `C1` | a judge-at-tier-null pair at the reversal path, plus a refused write | `0` | `read a` = `5` |
| `C2` | the two-address arm | `0` | `read a` = `5`, `read b` = `5` |
| `C3` | a **failing repair** | `0` | `read a` = `5` |
| `C4` | a plain refused write | `0` | `read a` = `5` |
| `C5` | a **root** judge-at-tier-null pair over a refused **descendant** write | `0` | `read ["a","x"]` = `1` |
| `C6` | an **ancestor** judge-at-tier-null pair over the same refused descendant | `0` | `read ["a","x"]` = `1` |

**The unwinding consults no pair.** That is `R8`, measured on the release that made a pair
reachable in more places than it has ever been reachable — the release on which it was most
worth re-measuring. `C5` and `C6` are the arms the widening created: a pair standing **above**
the act that was refused, which at `1.3.0` could not have been asked at all.

### 1.7 NOT A FINDING — `D-72`'s unbounded delivery windows, and we want to be seen not filing it

**`observed`, `p-d72bc-150.txt`.** A listener standing at `["r"]` that writes a **fresh child
address** on every delivery reaches **`9` windows from one ordinary write** (`["r", "k0"]` …
`["r", "k8"]`), while the same listener at the child address it names reaches `1` and stops.
**That listener makes an unconditional edit to its own sub-properties**, which is the caller's
own loop and the caller's to prevent — the ruling this catalogue recorded when `DEF-AQ` was
withdrawn (`THE-CALLER-PREVENTS-ITS-OWN-LOOPS`, §4). **We accept the ruling and ask nothing
here.** The arm is quoted so a later maintainer reading this file knows the window was
measured, ruled, and closed by us rather than missed.

---

## 2. The six open demands, ordered by severity

Six rows, **all upstream-owned and published-reachable**, and each owes an upstream issue.
Two are documentation rows (`DEF-AT`, `DEF-AC`); four are behaviour or declaration rows. The
long form of each is in `docs/defects.md`'s `2026-10-29` `1.5.0` block; the four-part filing
below is the digest. **Nothing here contradicts a ruling in §4**, and a demand that would
have is not filed (see §6's closing note).

### 2.0 · ★ `DEF-AU` — DOCUMENTATION: THE THROW IS THE DELIBERATE LOGGING CHANNEL, AND THE SHIPPED SENTENCE DENIES IT

**The behaviour is CORRECT and this row no longer asks for a change to it.** A listener's refused act
happens in the listener's **own** commit — a listener is not fired inside a commit; it is delivered,
it enters at the package entrance, and it opens its own — so **the caller is the only party positioned
to log the violation, and the throw is the channel that exposes it.** `read b` and `read ["b","x"]`
return the **admitted** values in both arms, which is the right state.

**What survives is a shipped contradiction, of the same class as `DEF-AT`.**

1. **`D-71` is false as written.** It says *"a listener is independent of the caller's commit, and the
   caller learns nothing of its outcome."* **The caller learns the listener's outcome** — that is the
   point of the channel. **Correct the sentence to describe it.**
2. **Nothing tells the caller that its own act stands when the throw arrives.** The throw's `status` is
   `ConstraintPassRefused`, indistinguishable from a refusal of the caller's *own* act — so a consumer
   reading only the answer concludes its write did not happen, while the store says it did. **State the
   rule plainly, and if the caller is meant to tell the two apart, say how.**

**Evidence.** `observed`, `/tmp/probe-storeroom-150/out/p-safestate-150.txt` ARM 1/2 and
`p-d71-150.txt` ARM (iii), against `/tmp/probe-storeroom-150b/out/p-safestate-140.txt` from the SAME
script.

**A note on this consumer's own record, because the maintainer should know what to distrust.** This
row was filed three times in one day: first as a **safe-state leak** ("a refused write's own value
stands"), then as an **ordering violation** ("the listener ran while the write could still be refused"),
and only now as **documentation**. **The store was right every time and the ordering was right too** —
each earlier reading took the answer as the truth about the store. **The discipline is now pinned: when
an answer and the store disagree, one of them is the defect and it is not automatically the store.**

**Cost if left.** A host reads a refusal as "my act did not happen" and re-plans against a state that is
not the state. `Provident-Electron`'s own store layer does exactly this.
### 2.1 `DEF-AR` — the message stopped exploding; the LOG is still a function of depth, and on this path the refused value stands

**SYMPTOM / REPRO** (`observed`, `p-defar-150{a,b,c}.txt`, `n28-150.txt`; the `1.4.0`
comparison `p-defar-140a.txt` in the same directory). A constraint body edits a descendant of
its own address and **stops at its own explicit depth limit `N` — no loop; every chain
terminates lawfully on the caller's own limit**. The refusal the caller holds carries a `log`
whose longest entry is a function of the chain's depth, with no bound anywhere in it, and at
the top of the range the refused **state** is left standing:

| `N` | `messageChars` | `logEntries` | `longestLogEntryChars` | `stateAfter` |
| --- | --- | --- | --- | --- |
| `20` | `4,203,189` | `22` | `4,202,872` | `ABSENT · ABSENT · ABSENT` |
| `24` | `67,119,521` | `26` | `67,119,204` | `ABSENT · ABSENT · ABSENT` |
| `26` | `268,446,999` | `28` | `268,446,682` | `ABSENT · ABSENT · ABSENT` |
| `28` | **`307`** | `29` | **`268,446,684`** | **`ABSENT · VALUE 1 · ABSENT`** |

**Two facts in that table are the row.** First, **the log entry is not capped**: at `N = 28`
the caller holds a refusal whose message is the package's own `307`-char generated sentence
while its `log` carries an entry of **`268,446,684`** characters. Second, **at `N = 28` the
refused state STOOD**: the same three-address read-back that answers `ABSENT · ABSENT ·
ABSENT` at `N = 26` answers `ABSENT · VALUE 1 · ABSENT` at `N = 28`. **A `ConstraintBodyThrew`
that leaves a value standing breaks the safe-state rule the refusal class exists to keep** —
a consumer that catches this refusal, believes it, and re-reads its own addresses will find
one of them holding the value the package has just told it was not there.

**The `1.4.0` series, for the shape of the repair** (`observed`, `p-defar-140a.txt`): `N = 2` →
`934` chars, `8` → `4,594`, `12` → `21,725`, `16` → `269,257`, `stateAfter` clean on every one.
**The doubling is unchanged; what changed is what happens at the host's ceiling.** We state that
as a result and **not** as a mechanism: this document does not claim to know which frame the
`307`-char fallback comes from, because we did not measure it (§4.2's discipline).

**ROOT CAUSE** (`read`). The crossed sentence is composed from the inner refusal's own
message, quoted with `JSON.stringify`, so each nesting level re-escapes the whole of the
previous level: `constraints.mjs:1281` (`… ITSELF a refusal, ${JSON.stringify(innerStatus)}
with the message ${JSON.stringify(innerSaid)} …`), and the judgement arm's `:2904` composes
identically. The log's per-level entry carries the throwable's form, one level per entry:
`kernel-foundations.mjs:260` (`throwableForm`), with its own `JSON.stringify(message)` at
`:282`. **Nothing in either composition is bounded while it is being built**, so the only
ceiling in the system is the host's — which is why at `N = 28` the report and the state come
apart.

**EVIDENCE.** `observed`, paths above. **Exact scope, unmoved:** a refusal thrown to the caller is
stable — `ao-150.txt` `AO.1` reads the same bytes before and after later work — so the growth is
visible only because the caller **holds** the refusal. **The unbounded chain is not this row**:
that is the caller's own loop (`DEF-AQ`, withdrawn, §4).

**FIX SHAPE — as filed, and half of it is now done.** Compose a crossed refusal's message from
a **SUMMARY** of the inner refusal — its `status`, the address it refused, and a bounded
excerpt of its sentence — never from the inner message verbatim; **and cap the composed length
while it is being built**, so that no host `JSON.stringify` is what finally decides. **And the
half still missing: bound the LOG ENTRY as the refusal message is now bounded at the ceiling,
and restore on this path.** A report is not a transcript, and a `log` is not a place to put a
chain.

**WHAT IT COSTS A CONSUMER.** Our host cannot read a deep refusal's log, and at `N = 28` it
cannot trust the state either. The failure arrives exactly on the chains we deliberately
bounded ourselves — the ones a careful consumer builds — and it arrives as a **silent
disagreement between what the refusal says and what the store holds**, which is worse than the
`1.4.0` host error, because a host error at least tells you not to trust anything.

**ONE SCOPE NOTE, measured this round and filed on no row of its own.** The `p-safestate` arm
drives the *ordinary* refusal path — a listener reverses another address, the caller's own
write is refused — and reads back the caller's own value: `read b` = **`VALUE 1`**, where the
`1.4.0` arm read `ABSENT(AddressNotFound)`; the second arm reads `VALUE 1` where `1.4.0` read
`VALUE 7` (`observed`, `p-safestate-150.txt` `ARM 1`/`ARM 2` against `p-safestate-140.txt`).
The same run asks whether any sentence names the write that stands, and answers **`NO`**. So
the boundary the `1.5.0` baseline change moved is **wider than the `N = 28` cell** above, and
this consumer is **not filing a seventh demand** for it: the row it belongs to is this one,
whose fix shape — *restore on this path* — already asks for it, and the rule the same edit
introduced (§1.1) is that a lawful listener's write must survive. It is recorded so the
maintainer fixing this row knows the arm to re-run, and so no later round files it as new.

### 2.2 `DEF-AO` — WITHDRAWN. The seal and the drop both precede the return, and nothing appends after it.

**We filed this as a defect three times and were wrong three times, and the correction is a premise we
had inverted: THE CONSTRAINT BODY IS NOT THE CLIENT.** The client is the **original caller of the package
edit surface**. A body is a frame the client's own code runs in — **a client that wires a constraint to
fish the log out of it can do so, and that is the client reading its own in-flight commit.**

**So the deciding question is not "can a body see the log before the seal" but "can a message be
appended after the final return to the client", and that is measured.**

**Measured.** A body caught an inner refusal and carried its handle out to client scope. **At the moment
of the top-level return the log already carried four entries — `constraint-check` · `constraint-check` ·
`outcome` · `commit`, the seal entry included.** After the return, across five further writes, a
constraint add and remove, a `listen`, a `delete`, a `read`, a `gc` and a 60 ms timer, it was
**byte-identical**. The arm where the refusal is **thrown to the client** is stable from receipt onward.
**No append occurs after the return, in either arm.**

**What is left is a documentation nicety, not a defect.** While the call is open, a wired body holds the
commit's **live** list and watches entry `0`'s message be rewritten in place as the pass progresses. **A
body that wants to keep what it read must copy it.** One sentence would do it.

**Evidence.** `observed`, `/tmp/probe-storeroom-150/out/ao-post-return.txt` and `ao-post-return2.txt`.
**An honest note on our own numbers:** a first run of this probe reported the log as *not*
byte-identical after the return; the cause was our script, which ran a **second** inner-refusal arm and
re-assigned the handle while comparing against a snapshot of the first. The clean run above is the
measurement.
### 2.3 `DEF-X` — WITHDRAWN. The `delete` pass judges the raise. Our probe's raise was consumed at registration.

**The package agent is right: this does not reproduce.** We filed it three times and the third filing added a
claim that it generalizes to a plain write host. **Both were our instrument.**

**What we claimed.** A raise from a constraint body during a `delete`'s constraint pass is not judged, its
effect stands, and the guide declares only two windows (`:1920-1927`).

**What a clean reproduction shows** (`defx-only.txt`; one script, both hosts, the raise **armed after
registration** so nothing else can consume it):

| arm | host pair ran | raise fired | `a-no-one` invoked (`ctx.tier === null`) | `read a` | the act answered |
| --- | --- | --- | --- | --- | --- |
| **host 6** — `delete`'s constraint pass | 1× | RETURNED | **1** (**1**) | **2** — undone | `ConstraintPassRefused` |
| **host 3** — a write's constraint pass | 1× | RETURNED | **1** (**1**) | **2** — undone | `ConstraintPassRefused` |

**Line for line identical. The `delete`'s pass judges the raise.**

**The confound that fabricated it.** Our probe registered the raising pair with an **unconditionally armed**
body, so the raise fired during **registration's evaluation — host 4, a DECLARED unjudged window** — and was
already applied when the `delete`'s pass asked the pair again. The second attempt answered
**`RollbackCompacted`**, nothing remained to judge, and our counter honestly read `0`. **The count was right;
our reading of it was wrong.**

**Nothing is filed on hosts 4, 5 or 6.** The guide's two declared windows stand as declared, and our `1.4.0`
host-6 cell was wrong for this same reason.
### 2.4 `DEF-AH` — downgraded to documentation: the member's PRESENCE is undeclared; the count claim is withdrawn

**What we claimed.** The witness reports at one raise (`AH.4` → `[{opId: "op-15", addresses: [["a"]]}]`) and
stays silent at two (`AH.5` / `AH.6` → `[]`), so *"`isEmpty` means nothing was discarded"* cannot be trusted.

**What clean arms show** (`defah-clean.txt`, `defah-listener2.txt`). `.discarded` is **absent** on every path
we can build:

- a raise **at rest**, refused → the raise's own `ConstraintPassRefused`; admitted → `RETURNED`;
- a raise from **inside a constraint body**;
- a **listener** raising **once, twice and three times**, with the pairs **refusing every raise**
  (`read a` / `read b` → `2`, the raises undone) or **admitting every raise** (`→ 1`, standing).

**No arm produced a false or empty-but-clearing answer.** Where the member exists it names what was
discarded; where it does not, the consumer gets `undefined`, **which cannot be read as a clearance**. So the
`AH.4`/`AH.5` contrast reflects **different outcomes** — something discarded versus nothing discarded — and
**not a count-dependent silence.**

**One small demand survives.** The sentence *"`discarded.length === 0` means this act's delivery discarded
nothing"* describes a member that is often **absent**. **The guide should say when it is present and what its
absence means — `undefined` is not `[]`.**
### 2.5 `DEF-AT` — the false clauses MOVED, they did not leave

**SYMPTOM / REPRO** (`observed` + `read`). At `1.4.0` this row named two sites; **the guide was
re-cut at `1.5.0` and both claims are still standing, at new line numbers.** **The failure is
retention in place, not absence** — the harder one to notice, because the current rule is also
declared, a few lines away:

- **`README.guide.md:1044-1046`** — *"**A pair at an ANCESTOR address is not asked by the
  delete's pass** — the pass keeps the write's exact-address rule and not the trigger set's
  prefix widening"*. **Contradicted by its own document at `:1055`** — *"so the delete's pass
  asks the pairs standing at the deleted address AND the pairs standing at every ANCESTOR of
  it"* — and by `D-56`'s prefix set, and by measurement (`observed`, `p-d67-150.txt` third
  line): a pair at `["d"]` **is** asked for a `delete` at `["d","x"]` (`PAIR asks: 1`,
  `tier null`).
- **`README.guide.md:1979`** — *"**YOUR `delete`'S OWN PASS IS STILL A MEASUREMENT AND NOT A
  BEHAVIOUR**"*, and, further into the same clause, *"IT NEVER CALLS THE KERNEL … no `K-3`
  runs a pass … the pair standing at the deleted address is asked exactly as often as its
  registration asked it, and NOT ONCE FOR THE DELETE"*. **Falsified by `§7.8` of the same
  document** (`:1008-1013`: a `delete` **is** an editing verb and **does** ask the pairs) and
  by measurement (`observed`, `b-defx7-150.txt` `B6`: the delete's own pass runs and the pair
  is invoked inside it).

**The current rule is declared, and we say so before we ask for anything** (`read`): `:985`
(*"THE MEMBERSHIP RULE, STATED ONCE: your pair is asked when THE ACT'S ADDRESS IS AT OR BELOW
YOUR PAIR'S ADDRESS"*), `:987` (`D-66`'s touched-set completion), `:989` (`D-66` read
symmetrically for a write's replaced value), `:1008` (the `delete`'s own pass) and `:1055`
(`D-56` verbatim). **Nothing needs inventing. Two superseded passages need moving out of the
reading position, with a one-line pointer where they stood.**

**FIX SHAPE.** Correct both clauses; **move the superseded bytes out with a one-line pointer**
(`RCA-8(g)`'s own discipline, which this consumer applies to its own documents) and leave the
standing sentence alone. **And a MIGRATION NOTE is still owed**, and it is the item with a cost
attached: a body authored at `1.3.0` to read the object **at its own address**
(`ctx.value.theme`) **now misreads at a descendant act and passes silently**, because a pair
standing at an ancestor is handed the **act's** `value` — absence, for a `delete` — and not the
object at its own address (`read`, `:985`'s closing sentences: *"a pair standing at an ancestor
is handed the value that landed AT THE ACT'S ADDRESS … not the object at its own"*). A body
that judges the wrong value and answers `true` is a **silent** loss of the constraint, and no
test of ours catches it, because no body of ours has been authored under the widened rule yet
(`U-STORE-CONSTRAINT-REGISTRY` is HELD, §6).

**WHAT IT COSTS A CONSUMER.** A guide is what a consumer's own engineer reads at 2 a.m. Two
sections of this one tell that engineer the opposite of the shipped behaviour, and the migration
note that would have caught the silent misread is not in it. **This is the cheapest row in the
list and the one with the largest blast radius on a consumer's correctness**: an editing pass,
no behaviour change, no test risk.

### 2.6 `DEF-AC` — the shipped change list still denies a cut release

**SYMPTOM / REPRO** (`observed` + `declared`, `docs-h-150.txt` `H1`/`H3`). The tarball carries
`RELEASE-NOTES.md` (`88,745` bytes, inside the `files` allowlist), and it carries its own
denial **standing in place**:

- **`RELEASE-NOTES.md:212`** — *"**NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT, NO VERSION
  BUMP IS PROPOSED, AND THE ELEVEN VERSION SITES STAY AT …**"*
- **`RELEASE-NOTES.md:216`** — an annotation affirming that **what that paragraph says about
  the cut survives**: *"UNMOVED: 'NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT' — `git tag
  --list` carries no `v1.3.0`, the registry carries no `1.3.0`, and a consumer cannot install
  any of this"*.

**Both are false inside the tarball that carries them.** `1.3.0`, `1.4.0` and `1.5.0` are all
published — `1.4.0` was **installed from the registry to measure it** (`observed`,
`/tmp/probe-storeroom-150b/node_modules/provident-storeroom/package.json`: `"version":
"1.4.0"`), and `RELEASE-NOTES.md` itself was read out of the `1.5.0` tarball. A consumer
reading the change list of the release it just installed is told that the release before it
does not exist.

**ROOT CAUSE.** A cut-state sentence is a document's claim about a fact decided **after** the
document is sealed into the tarball, so every release ships a document whose cut-state clauses
are true of the moment they were written and false of the moment they ship. **The package's own
record has ruled the class** (`D-57`, *"Drop the cut-state."*), and the guide's `:74` clause
moves its eleven figures to `1.5.0` — **so the rule is known and the change list's two clauses
were not regenerated with it.**

**EVIDENCE.** `observed`, `docs-h-150.txt` `H3` (both lines quoted at their own bytes) and `H1`
(`RELEASE-NOTES.md — does it name 1.3.0?: YES`; the `1.3.0` section's own `seq` line). The
catalogue's row is `docs/defects.md`, `DEF-AC`, unchanged at this release.

**FIX SHAPE.** **Regenerate the affected sections, or remove them.** This consumer does not ask
for a cut-state to be *stated* — the ruling says it is not a document's to state — it asks that
a **denial** of an installable release not ship inside that release's own tarball.

**WHAT IT COSTS A CONSUMER.** This catalogue cites documents as `declared` evidence, and a
`declared` line that denies observable fact teaches every consumer of that document to discount
the rest of it. That cost is not hypothetical: it is why every row in this file is labelled
`observed` first and `declared` last.

---

## 3. The two observations — **NO DEMAND**

**Nothing is asked on either row. No fix shape, no upstream issue, no round item.** They are
recorded so the numbers are on the record once, in one place, and so that no later pass
re-derives them as a finding. `DEF-AD` is a characteristic of the model; `DEF-AM` is a declared
shape with a declared cost. This consumer has accepted both.

**`DEF-AD` — the read cost of the constraint machinery** (`observed`, `h-defad-150.txt`):

| measure | `1.4.0` | `1.5.0` |
| --- | --- | --- |
| native reads, `200` permitted at-rest reversals | `140,300` | `140,300` (`701.5` each, `3.5` per address) |
| native reads, `200` refused reversals | `200,800` | `200,800` (`1,004` each) |
| `readLiteral` calls · `write` calls (the compensating restores) | `0` · `0` | `0` · `0` |
| `journalMark` calls (the per-opening cache) | `200` | `200` |
| heap, `200` pairs + `200` writes + `200` reversals | `992,328` B | `940,728` B (**`4,704` B/pair**) |
| unpacked tarball | `1,386,344` B | `1,520,345` B, `21` files |

**No read-count regression between `1.4.0` and `1.5.0`** — the read figures are identical to the
byte — and the heap delta per pair *fell* (`4,962 → 4,704` B). The cost is characteristic of the
model, not of a regression. The narrowing suggestion recorded in the catalogue (watch only the
addresses the reversal's own record names) **remains a suggestion and is not a demand.**

**`DEF-AM` — the witness's `addresses` length is correct and the member is non-enumerable**
(`observed`, `i-defam-150.txt`): `addresses.length` stays **`1`** at `1`, `3` and `25` registered
pairs (it was the whole registry — `200` addresses — at `1.2.0`); the member is `{writable:
false, enumerable: false, configurable: true}`, so it is **lost by spread, by `Object.assign`,
by `JSON.stringify` and by `structuredClone`**; `Object.keys(record)` reads the four declared
members while `getOwnPropertyNames` reads six. **The newer Symbol channels use the same
device** — `commit` on a `delete` receipt, and `bump-mark` / `register-body` on the instance — so
a consumer that serialises a record should know it drops them, and should know that this
consistency is a deliberate choice rather than a series of accidents.

---

## 4. Closed, withdrawn, and our own errors — read this before re-reading an older round

**This section is here to save the maintainer's time.** Every row below has been filed, and its
state has moved. Re-reading an older round and re-filing from it is the single most expensive
failure available to this process, and this consumer has done it — five entries in §4.2.
**Nothing in §2 contradicts anything in this section**, and a demand that would have is not
filed.

### 4.1 The states

| row | state | the one thing to know |
| --- | --- | --- |
| `DEF-AN` | **CLOSED at `1.5.0`** | §1.1; a listener's lawful write **survives** the caller's later refusal and the refusal says so; the clause that was false is now true |
| `DEF-AK` | **CLOSED at `1.5.0`** | §1.2; a body's throwable crosses in the `log` entry the declaration names, and a **listener's** throw reaches the original caller with **identity preserved**; only a throwable's identity *inside* a `ConstraintBodyThrew` stays outside, by declaration |
| `DEF-AI` | **CLOSED at `1.5.0`, by subtraction** | §1.3; `LogEntry.seq` is **gone** (`D-65`, *"Drop it"*), the position is the index; a **breaking** delta for a consumer that reads `.seq` |
| `DEF-AP` | **CLOSED at `1.4.0`** | both raises are asked and the commit is restored whole, in every order; **different subjects only** — a same-subject double reversal is unsupported usage and nothing is asked on it |
| `DEF-W` | **residual CLOSED at `1.3.0`** | §4.2; **this consumer withheld the credit for a cycle and recorded `0` for it**; the terminal-state judgement holds and a reversal inside a kernel pass **is** judged (`observed`, `i-regressions-150.txt` `I2`: judge asks `1`, outer write refused) |
| `DEF-AQ` | **WITHDRAWN `2026-10-29`** | a caller that makes **unconditional edits to its own sub-properties** is responsible for its own loop; the package owes no depth guard. The observation **stands and is not retracted**: no cap, the host dies of heap exhaustion (`exit 134`, `SIGABRT`), no `{status, message, log}` delivered — **the prevention is the caller's** (§1.7) |
| `DEF-AS` | **WITHDRAWN `2026-10-29`** | the widened act pass is **correct**; the `1.3.0` **exact-address pass was the defect**. The claim that the rule was undeclared was **ours and is withdrawn** — `RELEASE-NOTES.md` states it verbatim. What survives is the guide's retention of the old rule, filed as `DEF-AT` (§2.5) |
| `DEF-R` | **WITHDRAWN — not reproduced at either version** | the reorder never reproduced, at the version that filed it or any other; `1.0.1` then minted `registrationSeq` and sorted by it, so the ask was met by a defect that was not real |
| `DEF-O` | **WITHDRAWN** | a mis-filing by this catalogue: the constraint-register reader is **not** a substitute for a commit register, because **the package was right not to publish one** (`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`) |
| `DEF-T` | **RE-SCOPED** | the filed *"one refusal, two spellings"* claim did not reproduce and is withdrawn; what stands is four observed spellings across the fourteen members — a diagnostic, not a demand |
| `DEF-V` | **NARROWED to a diagnostic wish, no demand** | the refusal is correct by the package's own record; what survives is a preference about its message, filed as nothing |
| `DEF-I`, parameter half | **WITHDRAWN** | the op id **is** the lawful reversal parameter (`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`); only the unjudged-window half was ever live, and it is `DEF-X` (§2.3) |
| `DEF-AB`, spelling half | **CLOSED at `1.2.0`** | one renderer for both sentences, measured across three address families; its `seq` half is `DEF-AI`'s and closes with it (§1.3) |

**Read the table's shape, not only its rows.** The top three closed **this round**; the next two
closed earlier and are listed because a reader can still re-file from them; the rest are
withdrawals and narrowings, which are the states most often mistaken for open rows. **Thirteen
further closures hold** and are not restated here — the dated closure index in `docs/defects.md`
carries them, and `i-regressions-150.txt` re-confirms **`13` `HOLDS`** over the fourteen
regression rows. **No closure was broken by `1.5.0`:** the one `BROKEN` line in that harness is
its expected-broken marker for `DEF-W`'s residual, which stopped reproducing at `1.3.0` — the
credit §4.2 says was withheld.

### 4.2 OUR OWN ERRORS — the filings the maintainer should discount

**The maintainer is entitled to know which earlier filings to distrust, and this subsection
exists for no other purpose.** Five self-corrections are on this catalogue's record. **Four are
named below; the fifth is the older one.**

| our error | what we said | what was true |
| --- | --- | --- |
| **`DEF-W`** | the residual *"a reversal inside a kernel pass is not judged"* **held** at `1.3.0` — a closure credit **withheld for one review cycle** | the residual **stopped reproducing at `1.3.0`**: the pair **is** asked inside the pass and the write is refused (`observed`, `i-regressions-{120,130,140,150}.txt`: judge asks `0` / `1` / `1` / `1`). **The `0` came from an arm measuring the delete-DELIVERY window (host `5`), not the kernel's repair pass** — a mechanism read as a result |
| **`DEF-AS`** | a **fix** was filed as a **break**, and its rule as **undeclared** | the widened pass is **correct** and `1.3.0`'s exact-address pass **was the defect**; the rule **is** declared (`RELEASE-NOTES.md:66`, `declared`). Withdrawn as a defect; the documentation residue is `DEF-AT` |
| **`DEF-AH`** | *"the discard witness reports nothing discarded"* — **overstated** | the witness is **count-dependent**: one raise at a pair's address **is** reported (`[{opId: "op-15", addresses: [["a"]]}]`), two are not (§2.4). The demand survives, narrowed |
| **`DEF-X`'s `1.4.0` cell** | host `6` **now exists and judges**, and *"zero unjudged hosts remain"* | **our own output said `NO (0)` at `1.4.0` and says `NO (0)` at `1.5.0`** — the two cells are byte-identical (`b-defx7-{140,150}.txt`). **The fifth self-correction**; the cell is withdrawn, the row is unchanged |
| **the fifth, older** | the `STOREROOM-FILE-PROBE-FALSE-PASS` row was called **fixed** at `1.1.0` | it was **already absent at `1.0.1`** — the row was **STALE, not fixed**, and the earlier *"now unconditional"* wording was wrong |

**Say the pattern once, because it is the reason for this whole subsection: THREE of those five
self-corrections were a MECHANISM read as a RESULT.** `DEF-W`'s `0` was an arm measuring one
window reported as the kernel's pass; `DEF-AS`'s break was a widening's *design* read as a
*fault*; `DEF-X`'s host `6` was a shape in the source read as a judge firing. The two that were
not were an overstatement (`DEF-AH`) and a staleness (`STOREROOM-FILE-PROBE-…`).

**And the discipline this consumer has therefore pinned, binding on this document as much as on
any row in it: a disposition is written from the OUTPUT LINE IT CITES.** Not from the mechanism
the source suggests, not from the shape a declaration implies, and never from a commit subject.
Where this round could not do that — §1.4 and §2.1's `307`-char fallback, §2.4's mechanism —
**this document says so and files the result alone.** That is cheaper than a sixth
self-correction, and it is the only reason a maintainer should keep reading these rounds.

### 4.3 The standing rulings, accepted and not to be re-argued

**Each is a decision row in `docs/decisions/ACTIVE-store-and-package-binding.md`, cited by
name.** They are listed because a later round that re-argues one is repeating work this one has
already recorded as settled.

1. **The op id is the correct reversal parameter** — `OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`.
2. **There is no public commit register, and none is asked for** — the register is a mid-flight,
   JS-thread structure, **empty at rest**
   (`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`). A consumer that wants
   durability reads the store, not a register.
3. **The instance-lifetime retention model is correct** (`INSTANCE-LIFETIME-IS-THE-RETENTION-
   BOUND`): a constraint's lifetime is the store instance's, so the instance's own collection
   **is** the deletion site and **is** the bound. **No cap, no deletion site and no declared
   figure is asked for.**
4. **No version number is a defect** (`VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`): a package
   may ship any number of behaviour changes under any number; a consumer's remedy is a **pin**,
   not an issue. §1.3 states a breaking delta and **files nothing on the number**.
5. **Execution is sequential** — a listener's or constraint's own write enters through the
   package surface and restarts constraint checking so that prior constraints still pass;
   single-threaded JS makes it sequential, **so no race exists**. Any wording in an older round
   that implied concurrency was this consumer's, not the artifact's.
6. **The subtree widening is correct** — `D-56`/`D-66`: a pair is asked when the act changes the
   value at its address. `1.3.0`'s exact-address pass **was** the defect (`DEF-AS`, withdrawn),
   and §2.5 asks only that the guide stop carrying the superseded rule.
7. **A caller prevents its own loops** (`THE-CALLER-PREVENTS-ITS-OWN-LOOPS`): an
   **unconditional** edit to a sub-property of the address a body watches is the caller's
   construct, and the package owes no depth guard for it (`DEF-AQ`, withdrawn; §1.7's `D-72` arm
   is the same ruling measured).
8. **The client does not get a mid-commit message log** — the maintainer's own disposition, and
   §2.2 measures the package against it. **The demand stands; the ruling is not re-argued.**

**Nothing in §2 asks for a bound on a retained structure, a register, a version grade, a
concurrency guarantee, or the un-widening of a pass.** Every one of the six is either a
sentence, a length or a count.

---

## 5. Reproduction index

**The transcripts live in `docs/defects-history.md`**, the retrieval surface for every figure
quoted here. The probe output directories are named per row; the `1.5.0` install is
`/tmp/probe-storeroom-150/` (`1,520,345` bytes, `21` files, `addon.version()` = `1.5.0`), and
every `-140` output in the same directory came from the **same scripts** run against
`/tmp/probe-storeroom-150b/` (`1.4.0`, installed from the registry).

| row | probe / output path | what to look for |
| --- | --- | --- |
| `R8` (§1.6) | `/tmp/probe-storeroom-150/out/c-r8-150.txt` | six arms `C1`–`C6`; `TIER-NULL invocations … : 0` and the read-back on each |
| `DEF-AN` (§1.1) | `…/out/an-{140,150}.txt` | `read g` → `ABSENT` at `1.4.0`, `VALUE 1` at `1.5.0`, and the sentence naming the LAST VALIDATED MARK |
| `DEF-AK` (§1.2) | `…/out/g-defak-150.txt`, `…/out/p-d71-150.txt` | `G3`'s `marker-AK`, `G4`'s inner-refusal Symbol, `ARM (i)`'s `identity preserved?: true`, the two-window arm |
| `DEF-AI` (§1.3) | `…/out/d-seq-150.txt`, `…/out/ef-decl-150.txt`, `…/out/index.d.ts-{140,150}.txt` | `seq: undefined` on every entry; the five declared members; the removed `- readonly seq: number;` |
| `DEF-AR` (§2.1) | `…/out/p-defar-150{a,b,c}.txt`, `…/out/n28-150.txt`; comparison `…/out/p-defar-140a.txt` | the length series per `N`; `307` chars against `268,446,684`; `stateAfter` at `N = 26` versus `N = 28` |
| `DEF-AO` (§2.2) | `…/out/ao-150.txt` (`AO.3`), `…/out/last-150.txt` | `log.length` `3 → 4`, and entry `1`'s rewritten text |
| `DEF-X` (§2.3) | `…/out/b-defx7-{140,150}.txt` | the seven-host table; host `6`'s `judged? NO (0)`, `effect stands? YES` at both |
| `DEF-AH` (§2.4) | `…/out/ah-{140,150}.txt` | `AH.4`'s `[{opId: "op-15", addresses: [["a"]]}]` against `AH.5`/`AH.6`'s `[]` |
| `DEF-AT` (§2.5) | `…/out/s1c-150.txt`, `…/out/p-d67-150.txt`, `…/out/docs-h-150.txt` (`H4`) | the ancestor pair's `PAIR asks: 1`; the guide's anchors `1044`, `1055`, `1979`, `985`, `1008` |
| `DEF-AC` (§2.6) | `…/out/docs-h-150.txt` (`H1`, `H2`, `H3`), `…/out/i-regressions-150.txt` (`I13`) | `RELEASE-NOTES.md:212`/`:216`; `README.md`'s `1.5.0`; `addon.version()` = `1.5.0` against a `1.4.0` install |
| `D-67` (§1.5) | `…/out/p-d67-150.txt` | the five acts; `LISTENER deliveries: 1` on the descendant write and the descendant delete |
| `D-72` (§1.7) | `…/out/p-d72bc-150.txt` | `windows reached: 9` for a fresh child per delivery |
| `DEF-AP` / `DEF-W` (§4.1) | `…/out/ap-150.txt`, `…/out/i-regressions-150.txt` (`I2`) | the four arms; `in-pass … judge asks: 1` with the outer write refused |
| `DEF-AD` / `DEF-AM` (§3) | `…/out/h-defad-150.txt`, `…/out/i-defam-150.txt` | the read counts, the `940,728`-byte heap delta, `addresses.length` at `1`/`3`/`25` |
| surface + declarations (§0, §1.3) | `…/out/surface-{140,150}.txt`, `…/out/surface2-150.txt`, `…/out/index.d.ts-{140,150}.txt` | the `14` members and their arities, the `8 → 10` symbols, `native journalMark: function`, `register/2` |
| the safe-state scope note (§2.1) | `…/out/p-safestate-{140,150}.txt` | `read b` → `ABSENT` at `1.4.0`, `VALUE 1` at `1.5.0`; `does any sentence name the write that stands?: NO` |

**Everything above is reproducible without this project's harness**: every arm drives the package
through **published members only** (`write`, `read`, `delete`, `rollback`, `listen`,
`addConstraint`), and **no row depends on this project's host code or on the Electron shell**.

**One methodological note, because it is why the figures can be trusted twice.** The `1.4.0`
comparison was not re-derived from last round's notes: **the same scripts were run against a
second install** (`/tmp/probe-storeroom-150b/`). Byte-identical `-140`/`-150` outputs (`b-defx7`,
`ah`'s two-raise arms) are a row **UNCHANGED**; a difference (`an`, `p-safestate`, `p-defar`,
`h-defad`'s heap, `i-regressions`' `seq` line) **is** the row.

---

## 6. What we owe

**This round's ledger of work, printed with its terms:** **`2` closures** (`DEF-AN`, `DEF-AK`)
+ **`1` narrowing** (`DEF-AR`, to its log half) + **`1` narrowing against our own filing**
(`DEF-AH`, count-dependent rather than silent) + **`4` unchanged** (`DEF-AO`, `DEF-X`,
`DEF-AT`, `DEF-AC`) + **`1` self-correction** (`DEF-X`'s `1.4.0` cell — the fifth) + **`1`
declared surface delta** (`LogEntry.seq` removed, `DEF-AI` closed by subtraction) =
**`10` dispositions** `(2 + 1 + 1 + 4 + 1 + 1 = 10 ✓)`. **Every term above is a row this
document names**, and the long form of each is in `docs/defects.md`.

**The ledger of units is unmoved: `33 DONE / 3 open` units = `36`**, with **`41` live rows** in
this consumer's count — the same figure `docs/defects.md`'s `2026-10-29` tally prints — of which
**SEVEN carry a demand** (§2, `DEF-AU` first), **two are observations with no demand** (§3), and the rest are
closed or withdrawn records kept so no later round re-files them (§4). **`U-STORE-CONSTRAINT-
REGISTRY` remains HELD at its spec gate with `C-5` open**, and **no unit was admitted for any
row in this document** — a defect filed upstream is not work admitted here, and this round
admits nothing.

**What the maintainer can expect from us:** an upstream issue per row in §2, each carrying its
four-part filing and reproduction path; the `DEF-X` host-`6` question asked as a **question**; the
§3 observations recorded once and not re-filed; and, when a release answers a row, a **closure
with the release and the code path that closes it** — including a public correction of our own
catalogue where we owe one, which this round paid in full (§4.2).

**If only one pass is available, here is the order we would choose.** The **words** first:
`DEF-AT`'s two superseded clauses with the migration note, and `DEF-AC`'s two standing
sentences, are one editing pass with no behaviour change and no test risk, and together they
remove one row outright and shrink another. Then `DEF-X`'s one sentence (judge host `6`, or
declare it). Then `DEF-AH`'s witness, which is a count and not a mechanism. **`DEF-AR` is the
exception to that order**: it is the only row where a refusal and the store disagree about what
the store holds, so if the choice is made by risk rather than by cost it goes first and
everything else waits. `DEF-AO` needs nothing new — its disposition is already the maintainer's
ruling, and what is missing is the disclosure clause that ruling names.

**One note on what this round did not do.** Three candidate demands were considered and **not
filed**, because each would have contradicted a ruling in §4.3: a request for a **bound or an
eviction on the retained constraint registry** (ruling `3`), a request for a **readable commit
register** (ruling `2`), and a demand for a **depth guard on an unbounded edit chain**, which
was withdrawn at `1.4.0` and is **not revived** even though §1.7 measures the window again
(ruling `7`). All three remain observations at most. §2.1's scope note is the fourth thing we
chose not to file, and it says so at its own bytes.

**And three things this document will not do.** It will not re-file a row in §4; it will not
grade a version number (§1.3 states a breaking delta and asks for nothing on its number); and it
will not ask for a bound on a structure whose lifetime is the instance's. A future round that
does any of the three repeats work this one has recorded as settled — and the times this process
did exactly that cost the package credit it had earned (§4.2).
