# Provident-Electron → Provident-Storeroom: the open package issues

Regenerated `2026-10-14` at the architect's instruction ("Regenerate handoff doc for
existing defects"). This pass rewrote the file WHOLE; the prior bytes are preserved twice
(see "Prior bytes").

## What this document is for, and who acts on it

The issue-handoff assembly required by `AGENTS.md` item 7. Its subject is
**`provident-storeroom`** (the published npm package) and its platform artefact, whose
source repo is the ADJACENT `../Provident-Storeroom` (the sibling project), NOT
`../Preempt-Providence`. **The upstream that acts on this document is that sibling
repository.** Each block in section 2 is written so a maintainer there can reproduce the
defect against an install, find the code path, and decide the fix.

**This project CATALOGUES; it does not patch the package** (`AGENTS.md` item 7). No line
below reports a fix we applied, and none may be read as one. A fix observed to land is
recorded as a CLOSURE with the version that landed it (section 4), so it is not re-filed.

## Prior bytes, and where they went

The previous `docs/HANDOFF.md` was an accretion of eleven rounds. Its as-filed bytes are
preserved **byte-identically** at
`archive/handoffs/2026-10-14-HANDOFF-as-filed-before-regeneration.md` (`81,664` bytes; the
supervisor verified identity with `cmp`), and in git at commit **`ab60c2e`**. Nothing was
deleted by this regeneration: the `provident-ssr` rounds are summarised in section 7, the
withdrawn demands are quoted in section 3, and the closures are in section 4. The archive
copy is the authority for any sentence of the old text.

## Label discipline (binding on every sentence here)

- **`observed`** — a probe was executed and its output is quoted. Never inferred.
- **`read`** — a citation to code, a declaration or a release record, given as
  `path:line`. Evidence of what the bytes SAY, never of what they do.
- **`derived`** — inferred, and the inference says from what.
- **`declared`** — a package's own claim (README, guide, release note, declaration prose).
  **Never evidence of behaviour**, and no release note's claim is presented as a
  measurement.

Anything this document could not cite or measure is marked **`uncited`** or dropped.

**Provenance of the catalogue this renders:** `docs/defects.md`, its `## OPEN` table plus
its dated state lines, current states as of `2026-10-14`. Where this document and that file
disagree, that file governs; where a state below is a dated line rather than a row cell,
the date is printed with it.

---

## 1. What is open, ranked, one page

Ordered by what hurts a consumer most: (1) data integrity, (2) the channel a consumer
switches on, (3) the shipped record, (4) retention, (5) declarations and diagnostics,
(6) the architectural question, (7) artifacts a tarball does not carry, (8) `0.1.x`-era
residue. Detail is in section 2 only.

| # | Id | One line | Reachability | Versions affected | Demand, or question |
| --- | --- | --- | --- | --- | --- |
| 1 | `DEF-M` | The repair arm is inverted: a repaired write that fails leaves the REJECTING value in the store | `published` | `0.5.0` (measured) → `1.0.0` (re-run verbatim); `0.4.0` is the reverse comparison | **DEMAND** — declare or repair the repair-arm outcome |
| 2 | `DEF-W` | The reversal path is not constraint-checked, so a reversal can move the store to a state no constraint approved | `published` | `1.0.0` (`read`); not read at earlier versions | **DEMAND** — judge the reversal at its TERMINAL state, or declare it unjudged in the record |
| 3 | `DEF-H` | A constraint refusal crosses as `FileCommitFailed`, the store's SAVE code, with the kernel's token demoted to `log[].state` | `published` | `0.4.0` (filed) → `0.5.0` → `1.0.0`, unchanged | **DEMAND** — give a verdict its own status, minted from the kernel's token |
| 4 | `DEF-S` | A constraint body's throw propagates raw and unconverted, with no `log` | `published` | `1.0.0` (filed); not measured earlier | **DEMAND** — convert a body throw into the declared failure form |
| 5 | `DEF-N` | Registration refuses a WELL-FORMED pair whose constraint answers non-`true`, using the MALFORMED-ENTRY code `ConstraintListInvalid`; a re-enable can be refused the same way | `published` | `0.4.0` (same behaviour) → `0.5.0` → `1.0.0` | **DEMAND** — declare the arm, or stop refusing a well-formed pair with a shape code |
| 6 | `DEF-V` | A SUPPLIED `undefined` tier is answered `AddressMalformed` | `published` | `1.0.0` (filed) | **DEMAND** — a tier code, or `undefined` accepted as the declared default |
| 7 | `DEF-L` | The shipped record contradicts the shipped bytes: `README.md` documents a twelve-member surface including `settle`, a one-position `listen`, a two-member failure form and a FIFTH-position commit, in every tarball; the new consumer guide is not in the tarball | `published` | `0.4.0` (filed, narrowed at `0.5.0`) → `1.0.0` (widened) | **DEMAND** — reconcile the record and the bytes |
| 8 | `DEF-J` | The kernel's `CLOSED` map grows with no deletion site: an unbounded retention | `published` | `0.4.0` (filed); `UNCHANGED` at `0.5.0`/`1.0.0`; the map itself not re-measured | **DEMAND** — a removal arm and a declared bound |
| 9 | `R16` | No declared resident bound anywhere, with the measured retention figures beside it | (`published` structures) | all versions `0.2.0` → `1.0.0`; none declares a bound | **QUESTION** — which bound do you intend, if any? None is prescribed here |
| 10 | `DEF-P` | The declaration calls one `id` at two addresses unlawful while the code unions them into one pair | `published` | `1.0.0` (filed) | **DEMAND** — declare the union rule, or declare and enforce the refusal |
| 11 | `DEF-Q` | The `KC-3` log message lost its address: a consumer's diagnostics read `... at undefined` | `published` | `1.0.0` (filed); `0.5.0` printed `... at ["a"]` | **DEMAND** — interpolate the entry's own `address` |
| 12 | `DEF-R` | `constraints()` re-orders its own array on a toggle, and the difference means nothing | `published` | `1.0.0` (filed) | **DEMAND** — emit in a declared order |
| 13 | `DEF-T` | One detached-call refusal, two spellings | `published` | `1.0.0` (filed) | **DEMAND** — one message authority, asserted string-identical |
| 14 | `R14` | No per-graph / `secure` split at all, and the package has WITHDRAWN `R14` in its own catalogue while this consumer's binding ruling `UK-5` requires two registers, one per graph | (`published` absence) | all versions; none has any graph or `secure` concept | **QUESTION** — which reading do you intend? No demand attached |
| 15 | `DEF-U` | The package's own suite ships red BY RULING: one held disagreement between a floor token and a blind cell | `checkout-only` — a release-record artifact, not a tarball row | `1.0.0` as the release record publishes it | **DEMAND** — resolve the pair, or file the disagreement so red is never read as green |
| 16 | `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` | The published artefact's `version()` did not equal the wrapper manifest's, so every `storeCreate` threw | `published` (`0.1.1`) | `0.1.0`, `0.1.1`; recorded cleared at `0.1.2`, confirmed at `0.1.3`; NOT re-measured at `1.0.0` | **DEMAND** — none outstanding; the row asks for its own closure to be recorded |
| 17 | `STOREROOM-FILE-PROBE-FALSE-PASS` | A `filePath` whose parent the process cannot write was accepted at construction and failed at the first commit | `published` (`0.1.2`) | `0.1.1`, `0.1.2`; recorded closed at `0.1.3`; NOT re-measured at `1.0.0` | **DEMAND** — none outstanding; the row asks for its own closure to be recorded |

---

## 2. The open set, one block per row

Each block carries the catalogue's four-part form plus the exact versions and the observable
that will read differently once fixed. **No defect below is invented by this document**; each
has a row (or, for `R14`/`R16`, a named requirement) in `docs/defects.md`.

### 2.1 `DEF-M` — The repair arm is inverted: a repaired write that fails leaves the REJECTING value in the store

**(a)** A write whose constraint refuses one value and supplies a repair ends, when the
write fails, with the store holding the value the constraint REFUSED and the repair
discarded. It is `DEF-G`'s sibling: the same `0.5.0` edit that closed the reversal overshoot
produced it.

**(b)** Reachability **`published`** (installed entry alone, no checkout import). Present in
**`0.5.0`** (measured) and **`1.0.0`** (the `0.5.0` scenario re-run verbatim); `0.4.0` is the
reverse comparison, where the repaired value stood and the pre-existing value was destroyed.
Bytes measured: installed `1.0.0` in `/tmp/probe-storeroom-100`, `0.5.0` in
`/tmp/probe-storeroom-050`.

**(c)** Observed — **`observed`**, the `0.5.0` scenario re-run verbatim at `1.0.0`: *the
repair's write lands (`9` → `1`), the write fails, and THE STORE STILL READS `9`.* Also:
the probe reading at the same address is *repaired `1` → rejecting **`9`***; **`observed`**,
*a SUCCESSFUL repaired write returns an `op` whose `after` reads the REJECTING value (`value:
9`) while the store holds `1`*; and part 4, **`observed`**, *the repair's op is UNREACHABLE on
the passing arm* — the arm builds the report and the entry discards it.

**`read`, and it is the first headline:** the package's own e2e carries a scenario TITLED
with that outcome (*"... the composition reverses the repaired op ... so the attempt's first
write stands"*) plus a measured cell stating *"NOTHING is restored"* — **so a `1.x` patch that
fixed this would redden the package's own suite.** The asymmetry is recorded because no
package document names the halves together: on the PASSING arm the suite asserts the REPAIRED
value stands; on the FAILING arm it asserts the reverse.

**(d)** Reproduction (derived from the recorded scenario; the probe script is the
consumer's, section 6): `npm i provident-storeroom@1.0.0`, node `v24.20.0`; create a `mem`
store; `write` a lawful value at `['a']`; register a constraint over `['a']` whose body
rejects one specific value and supplies a repair; `write` that value; catch the throw; then
`read(handle, ['a'])`. Expected per the declaration: the repaired value. Observed: the
rejecting value.

**(e)** Root cause — **`read`**: the reversal composition in `src/constraint-kernel.mjs`
(the change whose own diff rationale reads *"Overshoot is a defect"*) now undoes the repair
op's effect along with everything else it rewinds. **The catalogue files no line for this row
and none is claimed.**

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL.** Either *restore-the-repaired-value* (the
reversal excludes repair ops) or *leave-the-rejecting-value* (the reversal is total, the
repair arm's outcome declared void on a reversal). **Whichever is chosen must be DECLARED in
the record**, and the passing arm must **return** the report it already builds.

**(g)** Fixed when: after a failing repair attempt `read(handle, ['a'])` answers the
**repaired** value, **and** a successful repaired write returns an `op` whose `after` equals
the value the store then hands back.

### 2.2 `DEF-W` — The reversal path is not constraint-checked: a reversal can move the store to a state no constraint approved

**(a)** `rollback(opId)` reaches the addon entry directly, so no constraint is consulted on
the reversal path at all: the answer's `restoredTo` is a state no constraint ever approved.
**This is not `DEF-I`'s withdrawn parameter claim** — the parameter is lawful (section 3,
item ii).

**(b)** Reachability **`published`** (the published entry's own path). Affected **`1.0.0`**
(`read`); no earlier version was read on this path and none is claimed. Bytes: installed
`1.0.0`.

**(c)** Observed — **`read`** (a code citation, carried as such; the row filed no probe):
`bindings/js/index.mjs:483-486` does `Reflect.apply(entryOf().rollback, this, args)`,
reaching the **addon entry DIRECTLY** — it never passes through
`bindings/js/src/entry/kernel-commit.mjs`'s `kernel.commit`, nor through `constraints.mjs`.
The answer carries `{opId, undoneOps, restoredTo}`, the last being the base state the store
is moved to; **a registered constraint the base state violates is neither consulted nor
reported**, and the reversal returns no judgement, no status member and no register write.
**`read`, and it is why the row exists:** the package's own doc block calls the verb *"the
constraint pattern's reverse step"* (`PAR-JS-9`) — the compensating-transaction reading of
constraints — so the path a reader is told is constraint-shaped is the one path that consults
nothing.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; create a store; `write` a value at
`['a']`; `write` a second value and keep its `opId`; register a constraint over `['a']` that
the FIRST value violates; `rollback(handle, thatOpId)` and observe that it succeeds, that
`restoredTo` names a state the registered constraint forbids, and that no refusal, status
member or register entry reports the violation.

**(e)** Root cause — **`read`**: `bindings/js/index.mjs:483-486`. The verb is a direct
pass-through to the addon entry, so the JS-side judgement modules are off the path by
construction.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL** (a declarative discharge is also
acceptable). **The check belongs at the TERMINAL STATE, never per unwinding step** — a
per-step check is unsound, because an unwinding composition passes through intermediate
states no constraint would approve. Either discharge is acceptable: **check**, or **declare
the reversal path unjudged in the record a consumer reads** (not inferred from the bytes).

**(g)** Fixed when: **after a reversal completes, the store's state satisfies every
registered constraint, or the reversal fails and its record says so** — asserted as:
`rollback` over a state a registered constraint forbids never answers a success object
carrying no judgement.

### 2.3 `DEF-H` — A constraint refusal crosses as `FileCommitFailed`, the store's SAVE code, with the kernel's token demoted to `log[].state`

**(a)** A refused constraint write throws `{status: 'FileCommitFailed', ...}` — the code the
store mints when a SAVE fails — while the kernel's real verdict token rides only inside
`log[].state`. Nothing failed to save.

**(b)** Reachability **`published`**. Affected: filed at **`0.4.0`**, `UNCHANGED` at `0.5.0`
and at **`1.0.0`**. Bytes measured: `/tmp/probe-storeroom-040` and `-100`; the `0.3.1`
comparison in `-031`.

**(c)** Observed — **`observed`**: register a constraint over a seeded address; write a
value it refuses; catch the throw and read `status` (`FileCommitFailed`) and `log[]` (the
kernel's own token). **`declared`, and it changes what is asked:** at `0.5.0` the package's
own record **re-ruled this label INTENDED**, so it is no longer a fix to await but a design a
consumer must accept or refuse. This consumer's rulings cannot carry it — `D-1` (the
`{status, message}` fields ride a **returned record**) and `X-1` (the reason union is
**CLOSED**) — because the token is outside the union AND is a false attribution.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; register a constraint over a seeded
address; write a refused value; in the `catch`, print `thrown.status` and
`thrown.log.map(e => [e.kind, e.state])`.

**(e)** Root cause — **`derived`**: the refusal crosses on the **store-failure channel**
rather than the kernel's verdict channel, so the verdict is only representable in the trace.
**The catalogue does not claim which module mints the `FileCommitFailed` literal; that was
not read.**

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL** (a new status token) with a DECLARATIVE
half (the record must name the arm a constraint refusal takes): give a verdict **its own
status**, minted from the kernel's token, carrying the attempt's `log`; never a save-failure
code.

**(g)** Fixed when: a constraint-refused write crosses with a status **no store-failure path
can mint**, while its `log[]` still carries the token it carries today — i.e.
`status !== 'FileCommitFailed'` on a refusal, and a save failure remains the only producer of
`FileCommitFailed`.

### 2.4 `DEF-S` — A constraint body's throw propagates raw and unconverted, with no `log`

**(a)** A constraint body that throws crosses as the caller's own raw value: a raw `Error`
with no `log`, and a thrown STRING escaping as a STRING. So the `{status, message, log}`
form — the only form a consumer switches on — is absent exactly where a caller's own code
failed.

**(b)** Reachability **`published`**. Affected **`1.0.0`** (filed `2026-10-14`); not measured
at earlier versions. Bytes measured: `/tmp/probe-storeroom-100`.

**(c)** Observed — **`observed`**: register a body throwing an `Error` — the raw `Error`
surfaces, with no `log`; register a body throwing the string `'boom'` — a string escapes.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; `addConstraint` a pair whose body is
`() => { throw new Error('boom') }`, then a pair whose body is `() => { throw 'boom' }`;
drive a write for each and catch what crosses.

**(e)** Root cause — **`derived`**: the body is invoked outside the kernel's refusal path, so
no conversion wraps it. No line is filed and none is claimed.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: convert a body throw into the DECLARED
failure form — a status naming the body, the attempt's log, the original error preserved as a
member. Never a raw escape.

**(g)** Fixed when: any body throw crosses as an object with a `status`, a `message` and a
`log`, and the original error is reachable from it — i.e. no value thrown by a body is ever
the value the caller catches.

### 2.5 `DEF-N` — Registration refuses a WELL-FORMED pair whose constraint answers non-`true`, using the MALFORMED-ENTRY code `ConstraintListInvalid`

**(a)** `addConstraint(pair, fn)` evaluates the body once at registration and, if the answer
is not `true`, refuses a pair whose SHAPE is valid — with the code that means the SHAPE is
invalid. A re-enable at `constraintOn` can be refused the same way, so a lifecycle failure
surfaces through a shape code.

**(b)** Reachability **`published`**. Affected: `0.4.0` behaved identically (**not a
regression**), through `0.5.0` to **`1.0.0`**. Bytes measured: `/tmp/probe-storeroom-050`,
`-100`; `0.4.0` in `-040`.

**(c)** Observed — **`observed`**: `addConstraint({address:['a'], id:'c1'}, () => false)`
answers `{status:'ConstraintListInvalid', message:"'a' is not a valid constraint entry..."}`
- a SHAPE sentence naming the address segment of a pair whose shape is valid and whose body
merely answered `false`. Then `constraintOff(id)` followed by `constraintOn(id)` re-runs the
same evaluation and can refuse. **`read`, and it moved the wrong way:** at `0.5.0` that throw
was UNDECLARED on a version that did not bind; at `1.0.0` it is UNDECLARED on a
**SEMVER-BOUND** method whose declaration names only **two** refusal arms.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; `addConstraint({address:['a'],
id:'c1'}, () => false)` and observe the throw and message; then `constraintOff('c1')` and
`constraintOn('c1')`.

**(e)** Root cause — **`read`**: the registration path evaluates the body once and routes a
`false` answer to the malformed-entry refusal instead of a verdict refusal. **The catalogue
names the registration/`constraintOn` evaluation site and files no line; none is claimed.**

**(f)** Fix shape — **upstream-owned: DECLARATIVE, or BEHAVIOURAL on the other arm.** Either
(i) registration does not evaluate the body (the constraint is judged at a write), or (ii) a
non-`true` answer at registration is refused with a **verdict** code naming the constraint,
and the declaration names that arm and the `constraintOn` arm explicitly. What must not stand
is a shape code on a well-formed pair.

**(g)** Fixed when: no well-formed pair is ever refused with `ConstraintListInvalid`, and the
declaration lists every refusal arm `addConstraint` and `constraintOn` can reach — i.e. a
typed consumer's handlers for the declared arms catch every refusal.

### 2.6 `DEF-V` — A SUPPLIED `undefined` tier is answered `AddressMalformed`

**(a)** `write(handle, ['a'], undefined, 1)` answers `AddressMalformed`. The address is
well-formed and the TIER was supplied as `undefined`, so the refusal names the wrong subject
and a caller repairing the address repairs nothing.

**(b)** Reachability **`published`**. Affected **`1.0.0`** (filed `2026-10-14`); not measured
earlier. Bytes measured: `/tmp/probe-storeroom-100`.

**(c)** Observed — **`observed`**, quoted: `write(handle, ['a'], undefined, 1)` ->
`{status: 'AddressMalformed', ...}`.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; create a store; `write(h, ['a'],
undefined, 1)`; read `status` and `message`.

**(e)** Root cause — **`derived`**: the tier check folds a supplied `undefined` into the
address path instead of the tier path. No line filed, none claimed.

**(f)** Fix shape — **upstream-owned: DECLARATIVE or BEHAVIOURAL.** Either a distinct status
for a supplied-but-invalid tier, or `undefined` accepted as the declared default tier. Never
an address code.

**(g)** Fixed when: `write(h, ['a'], undefined, 1)` either succeeds under a declared default
tier or refuses with a status whose subject is the TIER — i.e. its status is never an address
code.

### 2.7 `DEF-L` — The shipped record contradicts the shipped bytes

**(a)** Three parts, `read` unless labelled: the documentation and one shipped message
describe a surface that no longer exists, and the one document describing the current surface
is not in the tarball.

**(b)** Reachability **`published`** — `README.md` is a `files` row, so it rides every
tarball. Affected: filed at `0.4.0`; NARROWED at `0.5.0`; **WIDENED at `1.0.0`**, not closed.
Bytes read: the installed `1.0.0` in `/tmp/probe-storeroom-100`.

**(c)** Observed — **`read`**, three parts. (1) The shipped `README.md` documents a
**twelve-member** instance **including `settle`**, a `listen(address)`, the **two-member**
failure form `{status, message}`, and the commit at *"the FIFTH position"* — `0.2.0`-era prose
at the one version where a semver guarantee starts to bind; **a consumer following it gets
`TypeError: store.settle is not a function`** (`1.0.0` ships `14` members, `settle` removed
whole). (2) **The stale ordinal survives in shipped bytes:** the `write` commit-position
`TypeError` still says *"the fifth argument"* for a **fourth**-position parameter. (3) **The
new consumer guide is NOT IN THE TARBALL AT ALL** (the allowlist is five rows): it is a
checkout document whose section 0 says *"THE VERSION THIS GUIDE DESCRIBES IS `0.5.0`"*, and
whose section 12 promise (*"we tell you where our promises stop"*) **never once reaches the
constraint surface** — no repair section, nothing on what a refused constraint write leaves in
the store, nothing on the log's kinds, nothing on the published id being a live `rollback`
argument.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; open the tarball's `README.md` and
count the members it names, then `Object.keys(require('provident-storeroom')).length` and call
`store.settle`; call `write` with a fifth argument and read the `TypeError` text; list the
tarball's `files` rows and look for the guide.

**(e)** Root cause — **`derived`**: the record was not carried with the surface (each release
edited declaration and code and left the prose where it stood), and the guide was written as
a checkout document, so nothing shipped points a consumer at it.

**(f)** Fix shape — **upstream-owned, DECLARATIVE**: reconcile `README.md` and the `TypeError`
ordinal to the surface actually shipped at `1.0.0`; ship the guide (or a pointer to it) in the
tarball; give the guide a section on the constraint surface — what a refused constraint write
leaves in the store, the log's kinds, what the published id is. A release note naming the
surface the tarball carries would discharge part (1).

**(g)** Fixed when: every member, signature, failure-form shape and argument ordinal the
shipped `README.md` names exists in the shipped module with that shape — i.e. a consumer who
follows the README gets no `TypeError`, and the guide's version line equals the tarball's.

### 2.8 `DEF-J` — The kernel's `CLOSED` map grows with no deletion site: an unbounded retention

**(a)** The kernel's `CLOSED` map is populated on the terminal arm and **no deletion site
exists** in the published module: no removal arm, no declared bound, no cap. Second instance
of a retention class whose first instance is `DEF-E`.

**(b)** Reachability **`published`**. Affected: filed at `0.4.0`; **`UNCHANGED`** at `0.5.0`
and `1.0.0`. Bytes read: the installed `0.4.0` tree in `/tmp/probe-storeroom-040`. **`DEF-J`
itself has not been re-measured at `0.5.0` or `1.0.0`, and no movement is claimed.**

**(c)** The mechanism is **`read`** (the map, its terminal-arm population, the absent
deletion site). The figure of its class is **`observed`** and is stated with its own
disclaimer: **`200` pairs survive `200` reversals at `+540 KB` heap, with no declared bound,
no eviction and no cap.** **Stated honestly: that `+540 KB` reading was taken on the
`constraints()`/pair path, NOT on the `CLOSED` map.** So the row carries one measured figure
of its class and one un-re-measured structure, and it is **not** evidence for or against any
register's existence.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; drive a bounded number of
pass/refuse/reverse attempts against one store; sample `process.memoryUsage().heapUsed` each
round; read the kernel module in the tarball for a deletion site on the `CLOSED` map.

**(e)** Root cause — **`read`**: the map is written on the terminal arm and nothing removes an
entry. **The catalogue infers no release site that was not found.**

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL plus DECLARATIVE**: a removal arm at the
terminal state, and a DECLARED bound (a cap, with the behaviour at the cap stated).

**(g)** Fixed when: a bounded number of attempts leaves a bounded resident set — asserted as:
above the declared cap, the structure's size stops growing and heap use stops tracking attempt
count.

### 2.9 `R16` — No declared resident bound anywhere (a QUESTION, not a demand)

**(a)** No version declares a resident bound on any long-lived structure, and the measured
figures stand beside it. **Labelled a QUESTION: nothing here prescribes a bound.** The `0.5.0`
and `1.0.0` requirement views stated `R16` as NOT MET with a bound in mind, and the
`2026-10-14` round listed it among that round's asks; the architect's regeneration brief puts
it as a question, and this document follows the brief.

**(b)** Reachability: **`published`** structures; the absence of a declaration is observable in
the shipped declaration and record. Affected: every version `0.2.0` → `1.0.0`.

**(c)** The figures, with provenance — **`observed`**: `200` pairs survive `200` reversals at
`+540 KB` heap, no declared bound (same disclaimer as `DEF-J`: taken on the `constraints()`
path); `DEF-J`'s `CLOSED` map grows with no delete site (`read`); `DEF-E`'s `N — k` residue of
never-consumed adoptions is retained for the instance's lifetime (`observed` through its
consequence — N abandoned adoptions withhold exactly N later writes' deliveries).

**(d)** Reproduction: as `DEF-J`, plus a read of the shipped declaration and record for any
stated cap, eviction rule or bound.

**(e)** Root cause — **`derived`**: the structures are keyed by attempt and adoption identity
and released only by a later act on the same identity, so a workload that never performs that
later act retains without limit.

**(f)** Fix shape — **none proposed**: this is the question. **Which bound, if any, do you
intend, and where is it declared?** A one-line declaration saying "unbounded, by design,
because ..." is an answer we can carry.

**(g)** Fixed when — not assertable as a fix, because no bound is demanded. What can be
asserted: any bound the package declares is honoured — the structure's size stops at the
declared cap.

### 2.10 `DEF-P` — The declaration calls one `id` at two addresses unlawful while the code unions them into one pair

**(a)** `ConstraintPair.address` is declared an address SET and *"one id at N addresses"* is
declared unlawful, while the code accepts that pair and **unions the addresses into one pair**.
A typed consumer is told to refuse what the runtime honours.

**(b)** Reachability **`published`**. Affected **`1.0.0`** (filed `2026-10-14`); the
address-as-set re-typing is a `1.0.0` change, so no earlier version is claimed. Bytes read: the
shipped `index.d.ts` and the installed entry in `/tmp/probe-storeroom-100`.

**(c)** Observed — **`read`** of the declaration, plus **`observed`**: register
`{address: [['a'], ['b']], id: 'c1', constraint: ...}` and read `constraints()` — **one** pair
carries **both** addresses.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; register that pair; read
`constraints()`; compare with what the declaration says about that shape.

**(e)** Root cause — **`derived`**: the declaration was re-typed for the set and the acceptance
rule was left as it stood, so the two shipped halves were never reconciled in one place.

**(f)** Fix shape — **upstream-owned: DECLARATIVE (declare the union rule) or BEHAVIOURAL
(declare and enforce the refusal)**, plus the standing second half: **put `index.d.ts` under a
type check**, so its element types are verified text rather than unverified prose (`DEF-K`'s
own second half, on the member `DEF-K` did not cover; no pass has read a type-check leg for it
at `1.0.0`).

**(g)** Fixed when: shipment and runtime agree on that pair — asserted as: the pair either
compiles as lawful and is honoured, or is rejected by the compiler and refused at runtime.

### 2.11 `DEF-Q` — The `KC-3` log message lost its address

**(a)** The failure form's `KC-3` log entry reads `... at undefined` where `0.5.0` printed
`... at ["a"]`. The entry still carries its `address` column; only the prose drops it.

**(b)** Reachability **`published`**. Affected **`1.0.0`** (a regression relative to `0.5.0` on
the same message). Bytes measured: `/tmp/probe-storeroom-100`; the `0.5.0` comparison in
`-050`.

**(c)** Observed — **`observed`**: drive a `KC-3` refusal and read `thrown.log[]`; the `KC-3`
entry's message ends `... at undefined` while its `address` column is populated.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; register a constraint over `['a']`;
drive a refusal that produces a `KC-3` entry; print that entry's `message` and `address`.

**(e)** Root cause — **`derived`**: message and column are minted apart, and the template
interpolates a value no longer in scope on the `1.0.0` path.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL** (the message text) with a DECLARATIVE
guard: interpolate the entry's own `address`, and pin message/column agreement in the
package's own scenarios so a message cannot lose a column its record still carries.

**(g)** Fixed when: no log entry's message contains `undefined` for a column the entry itself
carries — asserted as: if `address` is set, the message contains that address's rendering.

### 2.12 `DEF-R` — `constraints()` re-orders its own array on a toggle, and the difference means nothing

**(a)** The constraint reader rebuilds its array from a live collection whose iteration order a
toggle perturbs, so a consumer diffing snapshots sees a change the store did not make.

**(b)** Reachability **`published`**. Affected **`1.0.0`** (filed `2026-10-14`); the member is
new at `0.5.0` and its ordering was not measured there. Bytes measured:
`/tmp/probe-storeroom-100`.

**(c)** Observed — **`observed`**: two of five snapshots differ across a pass, a refusal, a
`constraintOff`/`constraintOn` toggle and a `rollback`; membership is identical and the ORDER
moves.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; snapshot `constraints()` five times
across those four acts and compare the arrays element by element.

**(e)** Root cause — **`derived`**: the reader rebuilds from a live collection whose iteration
order the toggle perturbs, with no stable key governing emission.

**(f)** Fix shape — **upstream-owned: BEHAVIOURAL plus DECLARATIVE.** Emit in a DECLARED order
(registration sequence, or address then id), say so in the declaration, and make the reader
change only when the register changes.

**(g)** Fixed when: five snapshots across those four acts are element-wise equal, and the
declaration states the order emitted.

### 2.13 `DEF-T` — One detached-call refusal, two spellings

**(a)** A DETACHED constraint call produces a message different from the same call through the
instance: the four constraint members rebuild the refusal message on the JS side, while the
seven store-reaching verbs use the facade's.

**(b)** Reachability **`published`**. Affected **`1.0.0`** (filed `2026-10-14`). Bytes
measured: `/tmp/probe-storeroom-100`.

**(c)** Observed — **`observed`**: `const f = store.addConstraint; f(pair, fn)` answers a
message that differs from the same call through the instance.

**(d)** Reproduction: `npm i provident-storeroom@1.0.0`; for each of the four constraint
members, call it detached and through the instance, and compare the messages string for
string.

**(e)** Root cause — **`read`**/**`derived`**: one string with two authors, one per layer.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: one message authority for the receiver
refusal across every member, with a package scenario asserting **string identity** between the
two call paths.

**(g)** Fixed when: for every member, the detached call's message is strictly equal to the
instance call's message.

### 2.14 `R14` — No per-graph / `secure` split at all, and the package has withdrawn `R14` while this consumer's ruling requires it (a QUESTION, not a demand)

**(a)** The package has **no graph or `secure` concept at all**: `'secure'` is
`OutOfDomainTier`, one factory, one registry per instance. This block records the contradiction
and asks a question. **It demands nothing.**

**(b)** Reachability: the absence is observable in the shipped declaration and the tier domain.
No version `0.2.0` → `1.0.0` has any per-graph split.

**(c)** The two sides, cited. **This consumer's binding side:** `UK-5`, ruled `2026-10-13` -
**"two registers, one per graph"**; a generic pass never observes a `secure` commit and vice
versa. Live rows: `docs/specs/store-constraint-registry/contract.md:83` (the rulings table's
`UK-5` row), `docs/specs/store-constraint-registry/registers.md` section 2.1.3 item 11 (with
items 12-13 reconciling it to the landed isolation items), dossier cell
`docs/specs/u-store-constraint-registry-adoption-dossier.md:21` (`A-7`, `defined`). **The
package's own side:** the sibling has **WITHDRAWN `R14` in its own catalogue**, recorded in
this catalogue BY NAME as **`R14-WITHDRAWN-BY-UPSTREAM` vs `UK-5`-BINDING-HERE**
(`docs/defects.md:104`, the `0.5.0` requirement view; restated at `docs/defects.md:130`, the
`1.0.0` view).

**(d)** Reproduction of the absence: `npm i provident-storeroom@1.0.0`; read the shipped
declaration for any graph, scope or `secure`-register member; pass `'secure'` as a tier and
observe it refused as `OutOfDomainTier`; observe one factory and one registry per instance.

**(e)** Root cause — **`derived`**: the package models one store per instance and treats
`secure` as a tier-domain error, so no split is expressible; the sibling's withdrawal records
the position that no split is owed.

**(f)** Fix shape — **none proposed by us.** The question: **the package's withdrawal and this
consumer's binding `UK-5` cannot both be the intended reading. Which reading does the upstream
intend — that a per-graph split is not owed at all, or that it is owed and its absence is a
gap?** Both sides are on the record; this filing reconciles neither, and no pass of ours may.

**(g)** Fixed when — not assertable as a fix. What would settle it: an upstream statement of
intent, either way, in a document a consumer reads.

### 2.15 `DEF-U` — The package's own suite ships red BY RULING: one held disagreement between a floor token and a blind cell

**(a)** One scenario pair in the package's own suite disagrees — a **floor** token against a
**blind** cell — and the disagreement is **HELD** rather than resolved, so the suite is **red
by decision**. A consumer reading the suite as evidence cannot tell which half is the contract.

**(b)** Reachability **`checkout-only`** — a checkout/release-record artifact, not a tarball
row; nothing in an install exposes it. Affected: `1.0.0` as the release record publishes it.
Bytes read: the package's own suite and record; **this consumer ran nothing against the
package's checkout** (no byte of `../Provident-Storeroom` was read for this pass).

**(c)** Observed — **`read`**: the pair stands in the suite with the disagreement held, and no
record marks the suite's red as owed work.

**(d)** Reproduction: clone the sibling repository at the release's commit; run its own suite;
observe the held pair's disagreement and that the run is not green.

**(e)** Root cause — **`derived`**: the pair was left unresolved at a gate rather than
re-grained or withdrawn.

**(f)** Fix shape — **upstream-owned: BEHAVIOURAL on the suite, DECLARATIVE on the record.**
Resolve the pair (re-grain the cell or withdraw the token) so the suite is green, or file the
disagreement as its own row on the package's tracker so red is never read as green.

**(g)** Fixed when: the suite's own run is green at the release commit, or its red is recorded
as a named open item with a marker in the suite itself.

### 2.16 `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` — current status, stated honestly

**(a)** The published artefact's self-reported `version()` did not equal the wrapper
manifest's, so the load path's rung one refused the released artefact and **every
`storeCreate(...)` call threw** on a plain install.

**(b)** Reachability **`published`** (`0.1.1`, `linux-x64-gnu`). Affected **`0.1.0`** and
**`0.1.1`** (filed `2026-10-11`); **recorded cleared at `0.1.2`** (the artefact's self-report
is now stamped at build time from the package manifest — remedy (a) in the build-stamp form
this consumer's handoff recommended) and **confirmed closed at `0.1.3`**. **NOT RE-MEASURED AT
`1.0.0`; no claim is made about it.** Bytes measured: the published `0.1.1` and `0.1.2`
tarballs; the `0.1.3` retry.

**(c)** Observed at `0.1.1` — **`observed`**: `storeCreate({journalLength:32, listeners:[],
filePath:'/tmp/x.json'})` throws `{status:'FilePathUnreachable',
message:"'@auspicion/provident-storeroom-js-linux-x64-gnu' is not reachable at construction,
the path must exist or the application must be able to write it"}` — the artefact's path,
reported unreachable, on a successful install. Control:
`require('@auspicion/provident-storeroom-js-linux-x64-gnu').version()` answered `"0.1.0"`
while that platform package's manifest and the wrapper's both declared `0.1.1`.

**(d)** Reproduction at `0.1.1`: `npm i provident-storeroom@0.1.1`; then
`import('provident-storeroom').then(m => m.storeCreate({journalLength: 32, listeners: [],
filePath: '/tmp/x.json'}))`; observe the throw; control the platform package's `version()`.

**(e)** Root cause — **`read`**: the artefact's version was not bumped with the wrapper's. Rung
one compares `candidate.version()` exact-string against the package's own manifest version
(`index.mjs:136` `packageVersion()`; comparison at `:226-232`); the artefact answered
`"0.1.0"` (`bindings/js/Cargo.toml:3`, read by `bindings/js/src/facade.rs:1414` via
`env!("CARGO_PKG_VERSION")`) while `bindings/js/package.json` declared `0.1.1`. The mismatch
arm fires and, by the package's own design, rung two is not reached after a mismatch.

**(f)** Fix shape — **discharged at `0.1.2`; nothing further is demanded.** The remaining ask
is bookkeeping: the catalogue row still stands in `docs/defects.md`'s open table carrying its
`0.1.1` measurement, because no pass has rewritten the row cell. **We record the closure here
and in this section only; we do not edit the row** (the catalogue is another role's file this
pass).

**(g)** Fixed when (and it was): `storeCreate` constructs on a plain install and the
artefact's `version()` equals its manifest's. Both hold at `0.1.2` and `0.1.3`; the
re-measurement at `1.0.0` is **owed and not taken**.

### 2.17 `STOREROOM-FILE-PROBE-FALSE-PASS` — current status, stated honestly

**(a)** A `filePath` whose PARENT DIRECTORY the process cannot write was accepted at
construction, and the misconfiguration surfaced at the **first commit** instead. The declared
rule — reachable iff the file exists or the application can write it — was not discharged by
the probe.

**(b)** Reachability **`published`** (`0.1.2`, `linux-x64-gnu`). Affected **`0.1.1`** and
**`0.1.2`** (filed `2026-10-11`, re-validated against `0.1.2` and unchanged); **recorded CLOSED
at `0.1.3`** by the sibling's tenth bounded amendment, which withdrew the mode-bit screen as
the decision and made the binding verdict the kernel's own answer at an **EXCLUSIVE CREATE**
(`create_new`, `O_CREAT|O_EXCL`), naming `EROFS`/`EACCES`/`ENOENT`. **NOT RE-MEASURED AT
`1.0.0`.** Bytes measured: the published `0.1.2` tarballs, uid `1000`.

**(c)** Observed at `0.1.2` — **`observed`**: `storeCreate({journalLength: 8, listeners: [],
filePath: '/usr/bin/psr012-probe.json'})` — `/usr/bin` root-owned `0755` — **returns an
instance** with the tier fixed at creation to `file`; the first `file`-tier write then throws
`FileCommitFailed` (*"'c' could not be committed to '/usr/bin/psr012-probe.json', the file
write failed at ..."*), and no file is created. The `mem`-tier control over the same instance
succeeds, so the failure is the commit, not the store. Controls answering correctly: an absent
parent → `FilePathUnreachable`; a directory → `FilePathUnreachable`; a writable parent with an
absent file → constructs. **One assertion of ours is SUPERSEDED, and the correction is ours to
carry:** we claimed that construction "constructs AND CREATES NOTHING"; **at `0.1.3` it CREATES
that file, zero-length.**

**(d)** Reproduction at `0.1.2`: `npm i provident-storeroom@0.1.2`; `storeCreate` with
`filePath: '/usr/bin/psr012-probe.json'`; observe the instance returned; then `write` at the
`file` tier and observe `FileCommitFailed` with no file created.

**(e)** Root cause — **`read`**: the absent-file arm tested the parent's POSIX mode bits
(`src/store.rs:602-621`, `permissions().readonly()`, false whenever ANY owner's write bit
stands on the parent, regardless of the calling process), while the present-file arm opened the
file with `write(true)` — a true dry run. **The sibling re-filed it on its own side as
`DEF-20`, a DECISION CONFLICT and not a code defect** (a mode-bit decision against the
write-access requirement); its `0.1.3` amendment is the remedy.

**(f)** Fix shape — **discharged at `0.1.3`; nothing further is demanded.** The instrument this
consumer's handoff proposed (`libc::access(W_OK)` / `faccessat`) was **abandoned and never
landed**; the sibling's exclusive-create instrument is the stronger one, and we record the
abandonment without objection. The remaining ask is bookkeeping, as in 2.16.

**(g)** Fixed when (and it was): the root-owned-`0755`-parent configuration answers
`FilePathUnreachable` **at construction**, and a refused construction leaves no file behind.
Confirmed at `0.1.3`; the re-measurement at `1.0.0` is **owed and not taken**.

---

## 3. What we have withdrawn, so the upstream does not build what is no longer wanted

Two demands, each at the architect's ruling of **`2026-10-14`**, each quoted from the ask it
replaced. **The withdrawn text is not deleted from the corpus** — it stands in
`docs/defects.md` and in the archive copy of the old handoff; this section is the clause that
governs it. **A maintainer who implemented either withdrawn demand would have built something
this consumer no longer asks for.**

### (i) THE VISIBLE COMMIT REGISTER — withdrawn

**The ruling, verbatim (the architect, `2026-10-14`):** *"Also stop asking for a visible
commit register. The commit register is for tracking midflight changes and operates on the JS
thread, it will be empty when the store is at rest anyway."* Operative decision row:
`docs/decisions/ACTIVE-store-and-package-binding.md:48`,
`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`.

**What was asked, quoted from the asks this replaces** (`docs/defects.md`, the `0.5.0` and
`1.0.0` verdict sentences): *"THE RECONCILED VERDICT IS `MEETS-IN-PART`, AND THE DECIDING
REQUIREMENT `R3` IS UNCHANGED: this consumer's COMMIT register — commits not yet past all
constraints, with their ops and error messages — DOES NOT EXIST AT ANY PUBLISHED VERSION."*
and *"`R3` (the commit register) — NOT MET; the deciding gap."*

**Why (`derived` from the ruling):** the register is a **mid-flight, JS-thread structure,
empty at rest** — so it is not a public surface, no version owes a visible one, and a consumer
reading it at rest would find an empty table. Asking a store published from an addon for a
JS-thread mid-flight structure is a category error.

**What survives, and what does not:** the absence is a **fact about the bytes** and is
**retired as a demand**. `R3`'s **substance** stands internally, and **its only legitimate
observable is the attempt's record on the failure arm** — the attempt's own `log`
(`constraint-check` / `repair-run` / `outcome`, naming the constraint id, the write's op id
and the message), which the package already ships and the probe measured (`observed`). `R6`
and `R9` are re-read against an internal register, not deleted. **Catalogue consequence, named
so it is not re-filed: `DEF-O` is WITHDRAWN as an ask** — a constraint-register reader is not a
substitute shipped in place of a demanded one, and `constraints()`'s own declared disclaimer
(*"NOT a `pending()` reader, NOT an `attempts()` enumerator and NOT a live view of a running
commit"*) is correct discipline, not a mis-filing. **No upstream issue, fix shape or round item
is owed for `DEF-O`.** Its sibling `DEF-R` is a separate row and stands (2.12).

### (ii) THE PUBLISHED OP ID AS A PARAMETER OF A REVERSAL VERB — withdrawn

**The ruling, verbatim (the architect, `2026-10-14`):** *"The opID is the correct parameter,
stop calling that a defect. This is separate from the rollback not being constraint-checked."*
Operative decision row: `docs/decisions/ACTIVE-store-and-package-binding.md:49`,
`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`.

**What was asked, quoted from the ask this replaces** (`docs/defects.md`, the `0.4.0` `DEF-I`
filing and one-line cells): *"**OPEN — new at `0.4.0`; FILE IT AS A COLLISION**"* and *"**the
undo handle is now published to the client:** the kernel reverses via `rollback(op.opId)` per
still-owed op, and `log[].opId` hands those ids to the caller — so the datum a consumer must
treat as **a record, never an undo handle** arrives as **exactly the argument a reversal
takes**"*. The `0.5.0` restatement — *"Still a collision, not merely a defect."* — is withdrawn
with it.

**Why:** **the op id is the CORRECT parameter of a reversal verb**; **recording and reversing
are different acts, not different values.** A record may legitimately carry a value a reversal
would accept, and the parameter choice is not a defect.

**What survives, and it is the only thing asked on this subject:** **`DEF-W`** — the reversal
path is not constraint-checked (2.2). `D-1` (*"the op id is a record, not an undo handle"*) is
**not reopened**: it binds the violation path and says nothing about what parameter a reversal
verb takes.

---

## 4. What is closed and must not regress

One clause each, naming the code path, then the observable that would show a regression.

- **`DEF-A` — CLOSED at `0.4.0`** (re-confirmed `0.5.0`, `1.0.0`). A caller-supplied accessor's
  throw was laundered into the package's own refusal shape, and a caller could forge a status.
  Code path: the config path now stands **outside** the `try` (`index.mjs:408-410`), and the
  discriminator is a **`Symbol.for` identity mark** rather than the presence of a `status`
  member. **Regression observable:** a throwing accessor on `constraints`/`filePath`/`listeners`
  crosses as the caller's own raw error, and a caller-shaped `{status, message}` is never
  answered as the package's refusal.
- **`DEF-G` — CLOSED at `0.5.0`, re-confirmed `1.0.0` on the ancestor-sibling arm.** The
  reversal overshot its scope and destroyed a lawful pre-existing value no constraint had
  judged. Code path: `src/constraint-kernel.mjs`'s rollback-composition change (its own
  rationale reads *"Overshoot is a defect"*) stops the reversal undoing ops no constraint
  judged — the `readAfter` reading moved from `AddressNotFound` (`0.4.0`) to `2` (`0.5.0`).
  **Regression observable:** after a refused write, `read` at the seeded address answers the
  seeded value; on the ancestor-sibling arm, `1.0.0` answers the intact sibling where `0.4.0`
  and `0.5.0` both answered `AddressNotFound`.
- **`DEF-K` — CLOSED at `1.0.0`.** The shipped declaration's batch element carried no body, so
  a typed consumer could not use the batch route without a cast. Code path: the shipped
  `index.d.ts` batch element now declares `{address, id, constraint}` **with the body
  required**, and the code reads exactly those three. **Regression observable:** a typed
  consumer compiles a batch registration with a body and no cast. **The class is not retired, it
  moved one element along** (`DEF-P`, 2.10), and the fix shape's second half — a type-check leg
  over `index.d.ts` — is **unverified at `1.0.0`**.
- **`DEF-F` — CLOSED at `0.3.1`.** The constraint kernel was not shipped. Code path:
  `src/constraint-kernel.mjs` is the fourth `files` entry and the write itself evaluates
  constraints. **Regression observable:** a registered constraint body is called during a
  write (`body called >= 1x`) on an install with no checkout import. **Qualifier so the closure
  is not over-read: published is not exported** — the kernel is not in the `exports` map, so its
  element shape remains unreachable by a consumer import.

---

## 5. What we are not asking for

- **No new dependency.** Nothing here requires the package to add a dependency, a runner, a
  build step or a fourth leg.
- **No API rename on our account.** Our rulings renamed nothing in the package (`UK-5`'s and
  `C-1`'s vocabulary settles our side of the words only).
- **No change to the package's own test discipline.** Where this document asks about the suite
  (`DEF-U`) it asks for the disagreement to be resolved or its red to be recorded — not for a
  different discipline.
- **No patch from us.** This project catalogs; the upstream fixes. **No byte of
  `node_modules/**`, of any published artifact, or of `../Provident-Storeroom` was written by
  this pass**, and none will be.
- **Standing fact about our own unit, so no ask is read as needing a prerequisite: the
  consumer's own unit is held at its spec gate and activates nothing.** `U-STORE-CONSTRAINT-
  REGISTRY` is admitted `OPEN`, its contract stands at
  `docs/specs/store-constraint-registry/contract.md`, **no red row is authored and none may be
  until the architect's one spec-gate approval** (`contract.md:42`), and no package verb is
  imported or re-declared by that layer. Nothing here is contingent on it.

---

## 6. How to reproduce any of this

- **Install:** `npm install provident-storeroom@1.0.0` — the version whose bytes every `1.0.0`
  row above was measured against. Earlier comparisons: `@0.1.1`, `@0.1.2`, `@0.1.3`, `@0.2.0`,
  `@0.3.1`, `@0.4.0`, `@0.5.0`.
- **Runtime:** node `v24.20.0`, uid `1000`, `linux-x64-gnu` platform artefact. Installs were
  made with `npm install provident-storeroom@<version> --cache /tmp/npmcache-pk`.
- **Probe directories**, each review's probes with its own install and each cited by row in
  `docs/defects.md`: `/tmp/probe-storeroom-020` (the `0.2.0` baseline that filed `DEF-A`..
  `DEF-F`; probes `p1`, `p3`, `p15`, `p17`, `p18`, `p19`, `p20`, `p22`), `-031` (`0.3.1`),
  `-040` (`0.4.0`, the source of every `0.4.0` row), `-050` (`0.5.0`; the 17-experiment probe
  and `PROBE-RESULT-050.md`), `-100` (`1.0.0`; the 18-experiment probe).
- **The probe scripts are the CONSUMER's and are NOT shipped** — not in this repo's published
  artifacts, not in the package. They are not part of what the upstream receives; each block
  in section 2 states instead the shortest sequence of calls that shows its defect, and the
  directory names above say where the original scripts ran. If a probe directory has been
  cleared, the block's own steps are the record.
- **Registry facts** as measured by the supervisor: published versions `0.0.0-stage`,
  `0.1.0`, `0.1.1`, `0.1.2`, `0.1.3`, `0.2.0`, `0.3.0`, `0.3.1`, `0.4.0`, `0.5.0`, `1.0.0`,
  with `dist-tags.latest = 1.0.0` as of `2026-10-14`.
- **Requirement scoring:** requirements reviews ran against fresh installs of `0.2.0`,
  `0.3.1`, `0.4.0`, `0.5.0` and `1.0.0`; every one returned `MEETS-IN-PART`. The `1.0.0` tally, printed with
  its terms: `6 MET` (`R1`, `R2`, `R5`, `R10`, `R11`, `R13`) + `3 PARTIAL` (`R4`, `R7`, `R8`)
  + `7 NOT MET` (`R3`, `R6`, `R9`, `R12`, `R14`, `R15`, `R16`) = `16`. **`R3`'s NOT-MET term
  is retired as a demand by section 3(i)**; `R14` and `R16` appear above as questions.

---

## 7. History (one paragraph; not re-narrated)

The eleven rounds accreted in the previous version of this file divided as follows. **Rounds
1-9 addressed `provident-ssr`** — a DIFFERENT package, whose source repo is the adjacent
`../Preempt-Providence` — and every item they filed is resolved or closed: the `REQ-GAP`
series (1-12) landed across `0.1.1`-`0.1.3`, the adapter-parity, journal-replay and isolation
items (`0.1.4`, `0.1.5`, `0.2.0-rc.4`), the `UndoRedoReport` item (`0.2.1`), and the
destroy-undo reporting item `UNDO-REDO-DESTROY-STATUS`, which was **measured unreproducible at
`provident-ssr@0.5.1`** (it reports `no-op` behind the engine's resolve guard) and is closed;
no `provident-ssr` round is open and this document files nothing against that package. **Round
10 addressed `provident-storeroom`'s LOAD path** in the `0.1.x` era — its two residue rows are
carried in 2.16 and 2.17 with their current status stated. **Round 11 is the constraint/repair
facility's constraint surface**, which sections 1-5 assemble; it was extended at `1.0.0` and
amended twice at the architect's `2026-10-14` rulings, quoted in section 3. The as-filed text of
all eleven rounds is preserved byte-identically at
`archive/handoffs/2026-10-14-HANDOFF-as-filed-before-regeneration.md` and at commit `ab60c2e`;
read that copy for any sentence of the old narration.

---

**Label audit:** every `observed` above is a probe execution quoted from the catalogue; every
`read` is a `path:line` citation or a quotation of shipped text; every `declared` is the
package's own prose, never a measurement; every `derived` states what it was inferred from; the
reproduction steps are instructions, not observations, except where a step quotes an `observed`
answer.
