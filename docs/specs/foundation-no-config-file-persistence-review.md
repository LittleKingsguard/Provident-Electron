# Review — `FOUNDATION-NO-CONFIG-FILE-PERSISTENCE` (fork-sourced ask, `Astrographer`) — **GATE 1: the four-step proposal review**

**ALL FOUR STEPS HAVE RUN. THE VERDICTS, AS RETURNED: STEP 1 (`role_validity`) `BLOCKED-ON-SEMANTICS` · STEP 2
(`role_critique`) `FLAWED` · STEP 3 (`role_architecture_review`) `FLAWED` (the ruling) · STEP 4
(`role_change_analysis`) `NOT-DELEGABLE`, WITH THE DISPOSITION SET.**

**⟶ THE VOCABULARY RULING (STEP 4's, and it governs this record):** **the word in force for THIS repo's step 4 is
`NOT-DELEGABLE`** (`docs/specs/container-review.md:234`: *"no `DELEGABLE` / `DELEGABLE-WITH-CONDITIONS` /
`NOT-DELEGABLE` reading of any kind — that word belongs to step 4"*). **`FLAWED` is step 2's word and is filed at step
2** (`docs/specs/focus-model-review.md:174-175`: *"`FLAWED` is a verdict on the PROPOSAL AS FILED — on the proposal's
OWN TEXT"*; `docs/specs/gutter-ui-review.md:14`). **`BLOCKED-ON-SEMANTICS` IS NOT IN FORCE ANYWHERE IN THIS REPO:** it
is an unadopted **request** in `docs/pending.md` §K (`:618` header *"REQUESTS, NOT LANDED RULINGS"*; `K-2` at `:625`),
and `docs/specs/relocate-review.md:388` rules that vocabulary out explicitly (*"Its vocabulary is therefore NOT used
anywhere in this record as though it were in force"*). **Step 1's returned word is kept visible above as its own dated
return and is read as `FLAWED`-class substance; the condition `BLOCKED-ON-SEMANTICS` names (an admitted unit carrying
an `undefined-until-answered` adopted identifier) DOES NOT HOLD here — nothing is adopted, because no unit is
admitted.**

**`NOT-DELEGABLE`, IN WHICH SENSE (print it, so the two senses are never conflated): the `F2` precedent used the word
as an ARTIFACT hold** (`docs/specs/focus-model-review.md:260` — *"a finding about the ARTIFACTS, not a refusal of the
proposal"*). **THIS RECORD'S SENSE IS THE SUBSTANTIVE ONE: a refusal of the facility arm, a grant of the ask's OWN
alternative arm, and a doc-only coverage duty. There is no unit to delegate and no red set to author.**

**THE ONE-SENTENCE DISPOSITION:** *The foundation-owned generic userData config-file facility is DECLINED on the
standing text; the ask's own alternative arm — an upstream ruling that a fork owns its own carrier — is GRANTED; a
doc-only coverage pass is owed (`docs/FORKER.md` block + one `docs/decisions.md` ACTIVE row + one `docs/pending.md`
disposition row), and NO unit is admitted.*

**THE AS-RECEIVED ASK, KEPT VERBATIM BECAUSE ITS FRAMING IS ITSELF A FINDING:** *"FOUNDATION-NO-CONFIG-FILE-PERSISTENCE
— docs/defects.md (OPEN, foundation-owned) + docs/HANDOFF.md. Absent: no config module in `../Provident-Electron/src/
shared/`; `src/main/` has only domain-specific stores (security-store.ts, module-store.ts); no persistence page in the
foundation's guide; the config-file API family greps to nothing. Precision so the ask stays honest: focus-model.ts's
persist is a returned-write seam, not a config-file facility — so the request is a documented, schema-versioned
userData config facility with an atomic replace (or an upstream ruling that a fork owns its own). Never patched, per
AGENTS.md item 7. Request from downstream Astrographer project, complaining that this project has no persistent store
applicable for tracking the visibility state and positioning of panes. Verify the gap and plan modular persistence
stores if real or add coverage to guidance files if not."*

---

## §0. THE HEADLINE CORRECTION — THE CITED ROW EXISTS, AND IT LIVES IN THE **FORK'S** TREE

**Step 1 first reported the citation as phantom on a whole-foundation grep (zero hits). Step 4 CORRECTED the reading,
and the correction changes the routing class:** the row **EXISTS** —

| Where | Anchor |
| --- | --- |
| The fork's defect catalogue | `../Astrographer/docs/defects.md:37` — row `FOUNDATION-NO-CONFIG-FILE-PERSISTENCE`, **MED**, classified *"FOUNDATION / handoff"* |
| The fork's handoff document | `../Astrographer/docs/HANDOFF.md:49` — *"**FOUNDATION-OWNED**: catalogued in `docs/defects.md`, handed off here, **NEVER patched from this repo** (`AGENTS.md` item 7)"* |
| The fork's work queue | `../Astrographer/docs/next-steps.md:32` |
| The fork's breakdown doc | `../Astrographer/docs/specs/ui-feature-set-breakdown-2026-09-29.md:271-284` |

**So: the ask's `docs/defects.md` and `docs/HANDOFF.md` are the FORK'S files, and "foundation-owned" names the
OWNERSHIP OF THE GAP, not the location of the row.** The ask's item-7 citation is likewise the **fork's** item 7.
**This is the `H-r3` attribution class** (`docs/specs/provident-electron-shell-chrome-handoff-review.md:214`), i.e. a
cross-repo citation that must be read as an address in the asker's tree before it is read as a requirement in ours.
**THE FOUNDATION'S OWN `docs/defects.md` REMAINS UNTOUCHED AND EMPTY, AND THAT IS CORRECT:** its `## OPEN` table reads
`_(none …)_` (`docs/defects.md:72`) because it is the **`provident-ssr` PACKAGE-gap catalogue** (`:3-9`, `:104-105`),
and its own prose states the empty table is *"the honest state, not an omission"* (`:57-58`).

**The fork's own filing already concedes both arms — decisive, and it is why this is a disposition and not a
dispute.** `../Astrographer/docs/specs/ui-feature-set-breakdown-2026-09-29.md:276-284` records that the persistence
work is done today *"with its **own** fork-side store (`src/main/operator-settings-store.ts`, plus
`src/main/security-store.ts`)"*, and that *"**The `GAP-6` unit may not wait on it** (the proposed fix shape is
upstream-owned and **may equally be closed by an upstream ruling that a fork owns its own**)"*.

---

## §1. THE FOUR VERDICTS AND WHAT EACH STEP RETURNED

| Step | Role | Verdict (as returned) | Substance |
| --- | --- | --- | --- |
| **1** | `role_validity` | `BLOCKED-ON-SEMANTICS` — **word not in force here; read as `FLAWED`-class** | All four absence claims verified (with census corrections, §2); the cited row reported phantom (corrected at §0); admissibility **NONE**; routing HOST; falsifier = an architect sentence amending `H-r16` |
| **2** | `role_critique` | **`FLAWED`** — step 2's word, correctly placed | The ask is *good in intent, wrong in instrument*: the evidence block is double-counted and partly argues against the ask; the facility's only artifact is the persisted SCHEMA (prohibition 1 through prohibition 4); a doc-only fix closes the complaint at proportionate cost |
| **3** | `role_architecture_review` | **`FLAWED`** (the ruling) | Facility arm **DECLINED** on standing text; the ask's own alternative arm **GRANTED**; primary disposition = decline + doc coverage; STEP 0 = **no dossier**, written zero-row rationale |
| **4** | `role_change_analysis` | **`NOT-DELEGABLE`** | Final verdict + the exact change package + the gate-chain determination + the architect's one decision |

**The three substantive reviews do not disagree:** all verified the absences, all qualified the pane-state gap
(nothing persists pane state; **nothing prevents a fork from persisting**), all found the facility inadmissible, all
routed it host-side. The verdict-word divergence is vocabulary, not evidence.

---

## §2. VERIFICATION TABLE (every load-bearing claim, checked at its own site)

| # | Claim | Verified / corrected | Anchor + quoted text |
| --- | --- | --- | --- |
| 1 | The ask's cited row does not exist | **CORRECTED — it exists in the FORK's tree** | `../Astrographer/docs/defects.md:37`; `docs/HANDOFF.md:49`; see §0 |
| 2 | The foundation's `docs/defects.md` OPEN table is empty | **VERIFIED** | `docs/defects.md:72` `_(none — …)_`; `:46-47` *"This table is therefore EMPTY today"* |
| 3 | No config module in `src/shared/` | **VERIFIED — 19 `.ts` files (the ask's "20" is off by one)** | glob `src/shared/*.ts` |
| 4 | `src/main/` has only domain-specific stores | **VERIFIED — but the claim is precise only as "no GENERIC facility"** | `provident-security.json` (`src/main/main.ts:72`) and `provident-modules.json` (`:80`) are **persisted CONFIG files**, each domain-shaped (`src/main/security-store.ts:5` *"the main-process owner of the config the Settings pane reads/writes"*) |
| 5 | Exactly two `node:fs` write sites in `src/**` | **VERIFIED** | `src/main/security-store.ts:52` plain `writeFileSync` — **NOT atomic**; `src/main/module-store.ts:137-138` `${path}.tmp` + `renameSync` — **IS atomic** |
| 6 | Neither store carries a version member | **CORRECTED (imprecise, refutable by grep)** — the defensible form is **"neither store carries a SCHEMA version"** | `module-store.ts:23` `version: string` is the **installed module's own version**, not the store payload's — validated `:69`, written `:76`, required `:171` |
| 7 | `schemaVersion` greps to nothing | **VERIFIED — zero hits in `src/**`** | `grep -rn schemaVersion src/` → 0 |
| 8 | No `config.*` MCP API family | **VERIFIED — with the reading inverted** | `ALL_TOOLS` = **22** names in two families (19 `provident.*` + 3 `module.*`), `src/main/mcp-server.ts:364-387`, name-set-pinned at `tests/engine-pin-version.test.ts:102-132`. A `config.*` family would be **prohibition 5's new MCP surface**, i.e. an argument **against** the ask. **But note:** `config` is live as the security gate's own config (`src/main/security.ts:147,185,193`; `src/shared/types.ts:313`) — the absent thing is a **general-purpose** facility |
| 9 | `focus-model.ts`'s `persist` is a returned-write seam, not a facility | **VERIFIED — and the ask's own precision clause is exemplary** | `src/shared/focus-model.ts:442-449` *"IT CALLS NO STORAGE: it stores nothing, writes no file, touches no storage surface, holds no store, keeps no cache"* |
| 10 | No persistence of pane visibility/positioning | **VERIFIED, AND QUALIFIED — this qualification is the load-bearing correction** | `src/renderer/runtime.ts:563` `serializeSlice(…, { adapter: 'dom', persistence: false })`; **but every layout mechanism RETURNS its committed values through injected sinks and writes nothing itself** — `src/shared/zones.ts:5-8`; `src/shared/census.ts:98` (`revealed` is the consumer's decision, never a default); `layout-projection.ts`'s injected `VarWriteSink`. **The repo does not PREVENT a fork from persisting; it does not PROVIDE the file for it.** The ask's "cannot" is a "must write it myself" |
| 11 | No persistence page in the foundation's guide | **VERIFIED — 16 files — but MISLEADING as evidence** | the boundary is **already stated in eleven sites**: `docs/guide/theme.md:205`, `theme-control.md:239-240,297-298`, `focus-model.md:217`, `focus-tool.md:243`, `seams.md:85-86`, `relocate.md:40,343`, `gutter.md:212`, `overlay.md:248`, `menulib.md:232`, `container.md:182`, `zones.md:175`. A missing **page** is not a missing **facility**, and `docs/guide/README.md:56-59` **forbids** minting one (page filenames are pinned to unit ids) |
| 12 | The fork already owns a schema-versioned pane-layout state | **VERIFIED — read in the fork's tree** | `../Astrographer/src/renderer/layout-state.ts:66` `LAYOUT_VERSION = 1`; `:49-55` `LayoutState` (with `version: number` at `:50`); `:159-202` `coerceLayout` (**a version gate at `:162-170`**: non-integer / `< 1` / `> LAYOUT_VERSION` ⇒ `defaultLayout()`, fail-soft); `:75-79` **its own policy bounds** (`LAYOUT_ZONE_MIN/MAX = 160/640`, `LAYOUT_REGION_MIN/MAX = 120/1200`) |
| 13 | The fork already persists that state in its own store | **VERIFIED** | `../Astrographer/src/main/operator-settings-store.ts` — `enabledPanes` `:30`, `panesInitialized` `:35`, `layout` `:42`, coerced `:68-86`, persisted `:107`; path `userData/provident-operator-settings.json` at `../Astrographer/src/main/main.ts:402`. Its carrier inventory also includes `template-store.ts`, `engine-config.ts`, `authority-store.ts`, `security-store.ts`, `module-store.ts`, `rag-store-registry.ts` |
| 14 | The fork's own atomicity is internally inconsistent | **VERIFIED — the fork's to fix, on the fork's tree** | **non-atomic** `writeFileSync`: `operator-settings-store.ts:107`, `security-store.ts:77`, `engine-config.ts:57` · **atomic** `tmp`+`renameSync`: `module-store.ts:137-138`, `template-store.ts:106-107`, `rag-store.ts:825-826`, `vector-cache.ts:233-234`, `rag-store-registry-write.ts:275,282` |
| 15 | The standing clauses say what this record says they say | **VERIFIED, NO DRIFT** | `S-d4` `docs/specs/provident-electron-shell-chrome-handoff-review.md:180` *"this repo **must not acquire a UI-config store**"* · `S-d8` prohibition 4 `:184` *"**a UI-config store or any persistence of its own** (persisted state is supplied *to* the mechanism)"* · `S-d13` `:190` *"**Persistence stays consumer-side: this repo owns no UI-config store** (… the fork's `UI-CONFIG-CARRIER` is the carrier)"* · `H-r16` `:244` *"… it must gain a store, and **that is a new gate that must not be smuggled in**"* · `H-r14` `:242` (the misreading class) · `docs/decisions.md:73`/`:84`/`:86` |
| 16 | Ten landed contracts carry the boundary as a NEGATIVE, testable row | **VERIFIED — all ten; one anchor is off by two in the sibling report** | `docs/specs/theme.md:923` (`I-4`) + `:953` (`R-3`) · `theme-control.md:629` + `:1031` (`P-TC-IM-5`, built to FAIL) · `focus-model.md:1220` (`R-3`; the sibling's `:1188` sits on the adjacent `I-2` row at `:1186` — substance unchanged) · `focus-tool.md:944` (`P-FT-4`) · `overlay.md:905` + `:937` + `:1957` · `gsession.md:677` · `gutter-ui.md:2503` · `relocate.md:1394` · `container.md:968` · `menulib.md:1159` |
| 17 | The `ui` leg witnesses exactly two store file names | **VERIFIED — and a third file would be UNOBSERVED, not red** | `scripts/electron-ui.mjs:652` fixed two-name literal; fixtures `tests/ui-leg-seam.test.ts:422-423,462`; `tests/ui-leg-contract.test.ts:3822-3823`; §0 prohibition table at `docs/specs/ci-ui-leg.md:214` (*"HOLDS — asserted"*) |
| 18 | The ledger is closed | **VERIFIED — `21 DONE / 0 open`** | `docs/next-steps.md:13`, `:769`, `:2420`; `docs/guide/README.md:56-57` |

**Incidental staleness FOUND and REPORTED, not fixed here (out of this disposition's scope; annotate beside, never
silently rewrite — `RCA-8(d)`):** `docs/specs/gutter-ui.md:2504` and `docs/specs/ci-ui-leg.md:215` still quote the
`ALL_TOOLS` / `RpcMethod` **`21`** freeze against the live **22** (`src/main/mcp-server.ts:364-387`;
`docs/decisions.md:84` records the `21 → 22` move); and `docs/defects.md:33` cites the `R13-HOST-FIX` precedent at
`docs/decisions.md:39`, where the row now sits at **`:58`** (`:39` is `GSESSION-THE-DISPOSAL-GOVERNS-A-MID-CALL-BEGIN`).

**UNVERIFIED, and marked so:** the tail of `../Astrographer/docs/HANDOFF.md:49` and of `docs/next-steps.md:32` were
truncated at 2 000 chars by the read tool, so the ask's exact remedy phrasing could **not** be checked against the
fork's filed fix shape; its substance **is** corroborated in full at
`../Astrographer/docs/specs/ui-feature-set-breakdown-2026-09-29.md:276-284`.

---

## §3. THE ADMISSION QUESTION, BOTH READINGS, AND THE RULING

**Reading (i) — the text ADMITS it.** Three seams are argued: `H-r16` itself contemplates the repo gaining a store;
clause **(C)**'s *"mechanism"* is not an enumerated closed set; clause **(B)** can be claimed if the filesystem
arrives as an injected adapter.

**Reading (ii) — the text FORBIDS it, on every clause.**

- **(A)** *"exercised by shipped code in this repo (`src/**`)"* — **no such consumer exists.** The two stores serve
  their own domains; nothing in `src/**` exercises a generic facility.
- **(B)** *"every environment reading … arrives as an injected argument or callback and whose result is a value
  (**no ambient global, no store, no I/O**)"* — **disqualified BY ITS OWN TEXT**: a store performing I/O is *store*
  and *I/O*. **This is the finding that closes the ask: a *working* facility has no admissible clause; only a
  plan-returning husk survives (see §5), and a husk is documentation with an export list.**
- **(C)** — a config facility is **not** OS integration, nor frame/geometry/interaction mechanics, so **(C) is never
  reached**; and it independently fails **(C)#4** (*"a UI-config store or any persistence of its own"*), **(C)#5** if
  MCP-visible, and **(C)#6** (crash-during-write and v1→v2 migration are unprovable on layers this repo owns).

**IS "GENERIC" A DISTINCTION THE TEXT DRAWS ANYWHERE? NO — and this is the decisive point.** The text's distinctions
are (1) **whose state it is / who the consumer is**, and (2) **consumer-agnostic contract vs consumer vocabulary**
(`(C)#1`). *Generic* is the ask's own word; the text never ranks a generic facility differently from a domain-specific
one. **And genericity makes the ask WORSE, not better:** to be generic the facility must push the schema, the version
policy, the migration rule and the retention decision onto the consumer — but those are exactly what make it a
facility. What remains after prohibitions 1 and 3 are stripped is a `read`/`write-plan` pair, i.e. **a returned write,
which is not a store at all.**

**DOES `H-r16`'s WORKED EXAMPLE SETTLE IT? YES, AND AGAINST THE ASK.** `H-r16`'s example is a store gained for
**this repo's OWN state**, admitted only through an explicit **new gate** — a self-consumer `(A)`-route statement plus
a route requirement, **never a licence for a repo-owned facility serving a downstream consumer's schema**.

**RULING: reading (ii) governs. There is no admissible clause. `H-r16`'s "new gate" is the ONLY lawful acquisition
route, and the ask is not filed as that gate.**

---

## §4. DISPOSITION — PRIMARY AND REJECTED ALTERNATIVES

**PRIMARY — DECLINE the facility, and land a doc-only coverage pass.** The precedent is exact: `U-ENGINE-DRIFT` landed
as *"a measurement record with **zero production code and zero new tests**"* (`docs/specs/engine-drift.md:10-11,30-31`),
and the foundation's answer to the fork's `OS-1` was a **docs-only commit** writing a `docs/FORKER.md` carry block plus
a guide note with **no** new decisions row (`docs/FORKER.md:270`; `docs/guide/overlay.md:9`). **What is owed here is
`OS-1`'s shape PLUS the two tracker rows that an `OS-1`-class repair does not need, because this ask is a DECLINE (a
ruling) and because it leaves the fork's own row OPEN and re-filable.**

**REJECTED — (b) a tracker row only.** A row without coverage leaves the fork's actual, narrow gap open, and repeats
the double-counting error the ask itself made.

**REJECTED — (c) ADMIT a unit.** It has **no admission clause**; it would require the §5 amendment set (eight recited
clauses **+** the ten landed contracts' negative rows **+** the `ui` leg's §0 table and its two-name witness); it
**duplicates a facility the fork already owns**; and it makes this repo every fork's config store permanently, with a
fork's pane vocabulary as the first schema — **prohibition 1 breached THROUGH prohibition 4**.

**REJECTED — (d) a foundation `docs/defects.md` row.** Item 7 scopes that file to `provident-ssr` **package** gaps
(`docs/defects.md:3-9,104-105`); this is neither a package gap nor a host defect, so there is nothing to row. **No
`docs/HANDOFF.md` round is owed** (that document is the **foundation → upstream package** assembly, `docs/HANDOFF.md:3-7`;
this ask flows **fork → foundation** — the `SCH`-package channel, `docs/specs/provident-electron-shell-chrome-handoff-review.md:122`).

---

## §5. THE CHANGE PACKAGE (four edits, all documentation, all anchored)

**NO UNIT. NO SPEC. NO CODE. NO NEW TEST.**

1. **`docs/FORKER.md` — the fork-facing block (REQUIRED).** *Anchor A:* the `## 1` *"Does NOT ship"* cell (`:11-16`)
   gains one line: a persistence / config-file facility — the fork owns its own carrier. *Anchor B:* a new `###`
   subsection at the tail of `## 4. Reshape digest`, **immediately above `## 5. The archival-loop convention`
   (`:338`)**, so no existing row or anchor is displaced. *Content requirements:* (i) the boundary in one sentence,
   citing `S-d4` and `H-r16` **by id**; (ii) the foundation's own two userData files **named** (`src/main/main.ts:72`,
   `:80`) and stated to be domain-specific, not a general facility; (iii) the **three-element consumer recipe**, each
   element a citation and not new prose — the **returned-write seam precedent** (`src/shared/focus-model.ts:442-463`;
   `docs/guide/seams.md:265`), the **atomic-replace precedent** (`src/main/module-store.ts:136-138`, against the
   non-atomic contrast at `src/main/security-store.ts:52`), and **version-from-first-write** (the foundation carries
   **no** `schemaVersion` token and **no** migration machinery); (iv) the **witness gap** — the `ui` leg witnesses
   exactly two file names (`scripts/electron-ui.mjs:652`), so a fork's own file is outside every foundation witness
   and the fork must witness its own; (v) the return note — the fork's own row is answered by this block and is
   **annotated by the fork's own pass** (this repo writes no file under `<Astrographer>/`, `H-r6` precedent `:217`,
   `:507-508`). *MUST NOT:* enumerate pane/zone/tab/region names as a foundation vocabulary, default or documented
   constant (prohibition 1 **through a doc page** — quote the fork's **file paths** as evidence, never its zone list as
   a vocabulary); ship a file name, schema, migration, helper, store or exported symbol for the foundation itself;
   declare an MCP surface; present the fork's identifiers (`LayoutState`, `LAYOUT_VERSION`, `enabledPanes`,
   `coerceLayout`) as foundation names; or read the decline as a **permanent ban** — state the new-gate route
   affirmatively in `H-r14`'s own form.
2. **`docs/decisions.md` — ONE ACTIVE row (REQUIRED).** *Placement:* appended at the tail of the ACTIVE region, before
   `## HISTORICAL — superseded gate records`, and **cited BY NAME, never by line** (this ledger is appended-to and its
   anchors drift — `docs/specs/provident-electron-shell-chrome-handoff-review.md:106`). *Title form:* `DECIDED:
   NO-FOUNDATION-CONFIG-FILE-FACILITY — …`. *Content:* (1) the absence is **deliberate and documented, not an
   omission**; (2) the standing text that makes it so, cited by id (`S-d4`, `S-d8` prohibition 4, `H-r16`, plus
   `THEME-MECHANISM-AND-AUTHORED-CONTROL` and `FOCUS-UI-ONLY-MCP-TOOL`); (3) **the new-gate route stated
   affirmatively**; (4) the fork-facing answer — the fork owns its own carrier, file, schema version, atomic replace
   and witness; (5) the measured evidence that it already has one (`../Astrographer/src/renderer/layout-state.ts:66`,
   `:159-202`; `../Astrographer/src/main/operator-settings-store.ts:107`), cited as an **observation about a
   consumer's tree**, never as foundation contract; (6) the falsifier; (7) the fork-side return. *MUST NOT:* edit
   `AGENTS.md`; amend, weaken or retire `S-d4`/`H-r16`; claim a package defect; promise a facility later without
   naming its gate.
3. **`docs/pending.md` — ONE disposition row (REQUIRED).** *Anchor:* the fork-request disposition region
   (`## UPSTREAM REQUESTS FROM FORKS — DISPOSITIONS`, `:34`) — a new subsection in that region, since `§A`'s table is
   keyed to `SCH` ids. *Content:* the ask's exact title; the §0 fact that the row lives in the **fork's** trackers and
   that the foundation's `docs/defects.md` is the package catalogue whose OPEN table is empty; status **`DECLINED —
   CLOSED AS A DISPOSITION, NOT AS A DEFECT`**; a **reason code** — recommended **`FORK-OWNS-ITS-OWN-CARRIER`**, stated
   as a NEW code because no existing code names *"the asker already owns the facility"* (`TOO-THIN-WRONGLY-TARGETED` is
   the `SCH-3` precedent's code, `:286`); a **named, testable revisit condition** (this file's own form, `:239`):
   *a foundation unit whose own contract requires state to survive a restart — that unit's spec gate; or the fork
   re-filing with evidence that its own carrier cannot serve it*; the owner; and the **"no later pass re-files it"**
   clause. *MUST NOT:* file it as a `REQ-GAP-<n>`; describe the fork's atomicity inconsistency as a foundation defect;
   assert the fork's carrier as foundation contract; convert the decline into a blanket "no store ever"; or claim the
   fork's own row was closed by this pass.
4. **`docs/guide/seams.md` — ONE note (small, at the `persist` row `:265`).** One sentence tying the returned-write
   `persist` export to the boundary: the family's answer to persistence is a caller-called returned write, and the
   foundation supplies no store. **NO new guide page** — `docs/guide/README.md:56-59` pins page filenames to unit ids
   and the ledger is closed.
5. **`docs/next-steps.md` — NO ROW, AND THE ABSENCE IS DELIBERATE (stated so no later pass reads it as an omission).**
   The ledger is closed at `21 DONE / 0 open`; this disposition admits no unit and moves no count; `RCA-8(f)` admits no
   successor row for a closed ledger; and the pickup's *"standing NON-UNIT carries"* list already points generically at
   the parked items in `docs/pending.md`, which is where this disposition lands.

**IF THE ARCHITECT GRANTS IT ANYWAY — the minimal safe shape, so the option is costed honestly.** The only shape that
survives prohibition 4 is **not a store**: a pure module in `src/shared/` that **returns a write plan** over
caller-supplied paths and a caller-supplied payload and **executes nothing** (the family's landed form — `U-THEME`'s
declaration-only applier, `U-PROJ`'s injected write sink), imported by **no** `src/**` file, **MCP-invisible**, with
**no** `schemaVersion` member, **no** file name and **no** migration rule. Clause **(B)** still excludes a module that
performs the I/O, and clause **(C)** excludes a store: **so a working facility has no admissible clause and only a husk
does — and a husk delivers nothing the `docs/FORKER.md` block does not.** If it lands, the atomicity precedent is
`module-store.ts:136-138` (the only atomic, domain-neutral site in `src/**`), and the **amendment set** is:

- the **eight recited clauses** — `S-d8`(C)#4 (`:184`), `H-r8`#4 (`:226`), `H-r16`'s boundary sentence (`:244`),
  `S-d4` (`:180`), `S-d13` (`:190`), `docs/decisions.md:73`, `:84`, `:86`;
- **plus** `docs/specs/ci-ui-leg.md:214`'s §0 prohibition-4 row (*"HOLDS — asserted"* — which becomes false) and
  `scripts/electron-ui.mjs:652`'s fixed two-name witness (whose **duty is to be extended**, a cost, not a red — the
  third file is simply **unobserved** today);
- **plus** the **ten landed units' negative no-store rows** (§2 row 16), which stay `ACTIVE` contract text and must be
  **annotated, never rewritten** (`RCA-8(d)`).

*(Correction to step 1, recorded: its "trust-boundary row at `:374`" does **not** resolve — that anchor sits inside a
`U-MOUNTGUARD` annotation. The real eighth site is `docs/specs/ci-ui-leg.md:214`.)*

---

## §6. WHAT IS NOT OWED, AND THE FRAMING CORRECTION THE RECORD MUST CARRY

- **No foundation `docs/defects.md` row** — package-gap catalogue; its OPEN table's emptiness is *"the honest state"*
  (`:57`); a HOST row is admitted there only so no later pass re-files it upstream (`:32-34`), and the host-fix
  precedent's own text says it owes **no** `defects.md`/`HANDOFF.md` row (`docs/decisions.md:58`, cited by that row's
  **name** — see §2's staleness note on the `:39` anchor).
- **No `docs/HANDOFF.md` round; no upstream issue** — nothing in `provident-ssr` is involved at any point (the ask
  itself scopes the facility to a `userData` file).
- **The ask's framing must be corrected in the record, in two clauses:** (1) the files it names are the **fork's**, and
  *"foundation-owned"* denotes ownership of the **gap** — without this, a later reader hunts the foundation's trackers
  and concludes the ask was fabricated (exactly what step 1 did); (2) *"never patched, per AGENTS.md item 7"* is the
  **fork's** item 7 (its own HANDOFF says so verbatim).
- **The fork-side return note is OWED and is not this repo's to write:** the foundation records the disposition; the
  **fork's own pass** annotates the fork's own row.

---

## §7. GATE-CHAIN DETERMINATION FOR THIS DISPOSITION

**Honest answer from the repo's own precedents: a doc-only disposition triggers GATE 1 (run, this record), the folded
GATES 7/8, and GATE 10's tracker-cell duty — and nothing else.**

| Gate | Determination | Authority |
| --- | --- | --- |
| **1** | **RUN — this record.** Note item 8's own scope clause (*"applies to changes to the MCP contract — not to fixes inside a documented contract's shape"*): this proposal is neither, so the record is a courtesy to the fork channel as much as a gate | `AGENTS.md` item 8 |
| **2** spec | **NOT TRIGGERED** — no contract to file; triggered ONLY if a unit is granted, which then owes an `H-r8` six-row `§0 Contract-prohibitions` block | `H-r4`/`H-r8` |
| **3** TDD | **NOT TRIGGERED** — no source-code task; a docs-only pass may not edit `src/**` (`docs/next-steps.md:1534`) | `AGENTS.md` item 3 |
| **4** adversarial + PBT audit | **NOT TRIGGERED** — mandatory per completed **code** unit | items 7 RCA-3, 11(e) |
| **5** blind greens | **NOT TRIGGERED** — ships no behaviour | item 10/RCA-4 |
| **6** live battery | **`DOES NOT TRIGGER` — AND THE DETERMINATION IS RECORDED, NOT ASSUMED.** The mechanical predicate triggers iff limb A or limb B holds; **a documentation record is a NAMED NON-TRIGGERING change**, and *"no report"* is the only admissible exemption form (a zero-row report is INVALID) | `docs/specs/user-flow-audit.md:47-67` |
| **7 + 8** proofreader + doc review | **FOLDED INTO THE SAME PASS** — the repo's own close-outs fold them and date both records to that pass; record at `archive/reviews/<date>-foundation-no-config-file-persistence-doc-review.md` (gitignored provenance), fixing stale cells **in the same pass** (§2's two found drifts are the live candidates) | `AGENTS.md` item 10d/RCA-6; `docs/next-steps.md:21,55,83,117` |
| **9** trio | **NOT REQUIRED** — the trigger is *"after any feature or test change"*; a documentation pass runs no leg and **no claim may quote a figure as its own measurement** | `AGENTS.md` item 4 |
| **10** tracker / ledger | **NO LEDGER MOVE** (no unit, no count, no arithmetic). Its substance is the tracker-cell duty, discharged by §5's edits 1–3 | `docs/next-steps.md:13` |
| **11** PBT register | **THE ZERO-ROW EXEMPTION APPLIES — EXPLICIT, RECORDED, JUSTIFIED, NEVER SILENT:** the deliverable is **DOC-ONLY** (a class item 11(g) names), there is **no code-bearing surface**, and the ruling is cited **by row name** (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`) | `AGENTS.md` item 11(g) |

**STEP 0 / ADOPTION-DOSSIER RULING (explicit, for the gate record): NO DOSSIER IS OWED.** The dossier exists for a
**unit whose contract names, parameters or vocabulary originate outside this project**; here **no unit is admitted**, so
nothing is adopted and no row can be `undefined-until-answered`. **The coverage pass carries a WRITTEN ZERO-ROW
RATIONALE:** its declared surface is **docs only** (`docs/FORKER.md` + one note in `docs/guide/seams.md`, one
`docs/decisions.md` ACTIVE row, one `docs/pending.md` disposition row), it adopts **no** externally-sourced identifier,
and it must **not** import the fork's identifiers as foundation symbols, constants or defaults — the block describes
**the consumer's** pattern in **this repo's** vocabulary, and the fork's names appear only as cited evidence about a
consumer's tree. **Zero `src/**`, zero MCP surface, zero `package.json`, zero new tests.**

---

## §8. ARCHIVAL LOOP (item 6) — EXACT UPDATES, SAME PASS

**Mandatory:** (1) `docs/decisions.md` +1 ACTIVE row (cited by name) · (2) `docs/pending.md` +1 disposition row with
reason code + revisit condition + owner · (3) `docs/FORKER.md` block + one `## 1` cell line · (4) this gate-1 record
(the four step verdicts, the §0 framing correction, the §6 routing, the STEP-0 zero-row rationale, the gate-6
`DOES NOT TRIGGER` determination and the gate-11 exemption — **all recorded, none implied**) · (5) **a scoped commit
at the gate boundary** naming the disposition (`RCA-8(a)`/`(f)`), with **anchored `edit`s only** and **no whole-file
`write`** on these long, appended-to trackers (`RCA-8(c)`/`(d)`).

**Explicitly NOT updated:** `docs/defects.md` (no row — the absence is deliberate, §6) · `docs/HANDOFF.md` (no round) ·
`docs/next-steps.md` (no row, no count) · `docs/specs/ci-ui-leg.md` and `scripts/electron-ui.mjs` (they appear in §5
only as the amendment set that **would** be owed **if** a store were granted).

**Archive / repoint: NOTHING is archived and NOTHING is repointed.** No doc becomes obsolete and the ask has no landed
artifact; the phantom-row half has no foundation site to clean (the row exists only in the fork's tree, which this repo
must not edit). The only new gitignored artifact is the gate-7/8 provenance record.

---

## §9. RISK REGISTER

| Risk | Mitigation |
| --- | --- |
| **The fork re-files the ask** (its row stays OPEN; two sibling foundation asks are already OPEN in its file) | The pending row's *"no later pass re-files it"* clause + a positive, named revisit condition + the fork return note so the fork's own pass annotates its own row |
| **A later pass reads the decline as a PERMANENT BAN on any store** — the `H-r14` misreading class | The decisions row carries the **new-gate route affirmatively**; the pending row's revisit condition is positive, not prohibitive |
| **Consumer vocabulary smuggled into the foundation through a doc page** (prohibition 1) | Keep the fork's identifiers in the **citation column only**; the falsifier is a grep of the new block for pane/zone/tab/region tokens used as symbols or defaults |
| **"No config facility" misread as "this repo has no persisted config"** | Name the two userData files (`src/main/main.ts:72`, `:80`) and state plainly that they are domain-specific, not a general facility |
| **The decline read as scope-creep-by-omission** — i.e. the foundation "forgot" | The decisions row's first clause: the absence is **deliberate and documented, not an omission** |
| **The doc block drifts from the fork's carrier** | Cite the fork's files by path+line **with the read date**, and state the block's claim is the **boundary**, never the fork's schema — the fork may change its own store freely |
| **The two pre-existing count drifts (§2) become "the doc pass didn't do its job" findings** | Name them in the pass record as **found**; annotate beside; sweeping them is out of this disposition's scope unless the go-ahead covers it |
| **The fork's atomicity inconsistency read as a foundation duty** | State plainly it is the fork's, on the fork's tree, and that no foundation pass may edit `<Astrographer>/**` |
| **`RCA-8(c)`/`(d)` damage while editing four long appended-to tracker files** | Anchored `edit`s only; one scoped commit per gate boundary; no renumbering; no whole-file writes |
| **The strongest FOR-the-ask argument left unanswered** — that downstream reuse justified three earlier overrides (`A-d4` panes/zones, `A-d5` focus, `A-d6` theme), each of which reversed a decline | Address it head-on: **reusability is the very reason prohibition 4 had to be written**, and an override already has a named route (the new gate). It does not defeat the ruling |

---

## §10. THE ARCHITECT'S DECISION (the one question the go-ahead turns on)

> **Do you DECLINE the foundation-owned config-file facility and land the doc-only coverage + boundary record
> (recommended), or do you GRANT a new gate for a foundation store unit?**

- **(A) Decline + coverage (RECOMMENDED).** Grants the ask's **own** alternative arm and delivers the fork a recipe it
  can act on today. **Blocks nothing**; it is what the fork's own filing says is acceptable
  (`ui-feature-set-breakdown-2026-09-29.md:282-284`) and already does (`:276-278`).
- **(B) Grant a new gate for a store unit.** Legitimate, and the honest counter-argument is real (`A-d4`/`A-d5`/`A-d6`
  each reversed a decline on downstream-reuse grounds). But it owes a full chain **plus** §5's amendment set, and it
  contradicts `S-d4`, the admission rule's prohibition 4, and the `U-THEME` precedent (a far smaller ask, declined
  `TOO-THIN-WRONGLY-TARGETED`, `:286`).
- **(C) Decline with no coverage.** Blocks nothing mechanically, but leaves the fork unanswered, guarantees a re-file,
  and forgoes the one cheap thing that closes the complaint.

---

## §11. FALSIFIER

**The single observation that would overturn this verdict:** a **shipped, in-tree consumer** — a call site in `src/**`
that actually runs, not a test, not a sample, not a demo — **whose required state must survive a process restart and
has no seam through which a caller can supply it**: a boot path that reads persisted state with no injected channel,
plus a spec clause inexpressible under clause (A) or (B) with a returned write. **The verdict rests on the verified
fact that no such consumer exists** (§2 rows 5, 9, 10, 15). *Second, weaker falsifier:* the architect ruling the store
IN on the `A-d4`/`A-d5`/`A-d6` downstream-reuse ground — that would not falsify the analysis; it would **supersede** it,
in which case this record's step-4 word stays `NOT-DELEGABLE` and a new ruling row opens the gate.

---

## §12. PROVENANCE

**The four step reports were returned to the supervisor and are filed HERE as substance in this record; none landed as
an artifact of its own** — the same recurring unfiled-return gap the wave recorded as `P-1` (`relocate-review.md`),
`menulib-review.md` `§7`, `overlay-review.md` `§6` `OV-1`, `theme-control-review.md` `§6` `TC-1` and
`focus-model-review.md` `§6` `FM-1`; here the record is landed **in the same pass as the reviews**, so the gap is
closed rather than carried. **No code, no red set, no register, no leg and no `§5.U` matrix ran or was emitted here.**
**This pass's own legs:** none claimed — this is a documentation/gate record, and **no leg figure is quoted as this
pass's measurement** (`RCA-12`).
