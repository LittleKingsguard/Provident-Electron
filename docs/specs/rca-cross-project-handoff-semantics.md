# RCA — THE `threshold` SEMANTICS FAILURE: A CROSS-PROJECT HANDOFF CARRIED A NAME WITHOUT A MEANING

**Status:** `RCA — RECORDED 2026-09-27` (the architect's request; this document is the analysis + the requested harness modifications). **Scope:** the adoption of the upstream fork's `SCH-7` (`PANE-RELOCATE-GESTURE`) into this repo's `U-RELOCATE` (`E4`), and the one identifier that crossed the boundary undefined: **`threshold`**.
**Trigger:** the `E4` gate-1 proposal review returned **`VALID-WITH-CONDITIONS`** (validity) beside **`FLAWED`** (critique), and the critique's **item 2 — *"whether `threshold` survives at all"*** was the one finding that could not be answered from any record in this repo. The architect's answer (recorded as `docs/decisions.md`'s ACTIVE row **`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`**) had to supply the whole behaviour the word stood for.

---

## 1. WHAT HAPPENED, IN ORDER (each step with its artifact)

| # | Step | Artifact | What it recorded about `threshold` |
| --- | --- | --- | --- |
| 1 | The fork asks for a pane-relocate mechanism | the upstream fork's `SCH-7` row (`PANE-RELOCATE-GESTURE`, *"the relocate/drop model + reveal-set writes"*; cited in `docs/pending.md`'s `SCH-7` row) | the identifier appears **inside a parameter list**, with no unit, no comparand and no referent |
| 2 | This repo dispositions the ask | `docs/pending.md`'s `SCH-7` row — first `DECLINED + REFILED` (reason `APP-POLICY-STATE`), then **`ADOPTED-RESHAPED → U-RELOCATE`** by architect ruling `A-d4` | *"`threshold` is an **injected** value, never a mechanism default"* — **an ownership statement read as a definition** |
| 3 | The adoption is landed as five unit contracts | `docs/decisions.md`'s `SHELL-CHROME-PANES-ZONES-IN-SCOPE` row; `docs/specs/provident-electron-shell-chrome-handoff-review.md` `§1.4` | the **signature is quoted verbatim** (`createRelocateSession({session, candidatesFor, resolveTarget, onReveal, commit, threshold})`) and the two binding rows are *"interrupt/cancel leaves no retained sinks and no listeners"* + *"threshold is an injected value"* |
| 4 | The ledger carries it as the unit's acceptance shape | `docs/next-steps.md`'s `## OPEN` row `E4` | the acceptance cell **re-quotes the same signature** — so the unit's "contract" reads as complete while one of its six names has no meaning |
| 5 | Meanwhile the same TOKEN is listed as contraband in three landed contracts | `docs/specs/gutter.md` `§2.2` P-5 + `§3.4` R-1 · `docs/specs/gsession.md` `§2.2` P-1/P-5/P-7 + `§3.4` R-1 · `docs/specs/gutter.md` `§4.4` S-11 (*"a `selectors`/`threshold`/unit parameter"* ⇒ **STOP: that is a contract change**) | `threshold` is a **rejected-shape vocabulary token** inherited from the fork's `SCH-2`/`SC-2` request — *"no `selectors`/`threshold`/`data-zone` vocabulary"* — i.e. the receiving project had classified the identical identifier as **forbidden**, for a different and equally valid reason |
| 6 | The unit reaches gate 1 | the two gate-1 verdicts (this session) | the validity pass reads the ownership clause as sufficient (`threshold` carried opaquely, never evaluated — its `C-5`); the critique reads a bare unread number as dead weight and asks for the ruling (`FLAWED`, item 2). **Two competent reviewers, opposite admissible readings, both derived from the records.** |
| 7 | The architect answers | the `docs/decisions.md` row `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` | **the whole behaviour had to be supplied**: the zone **expands to visibility** inside the proximity, a **ghost** previews the drop, a release outside it is the **invalid-placement reset**, and **the threshold is that DISTANCE** |

**THE COST, measured in gate cycles (not in opinion):** one gate-1 pass whose central finding was this single word; a four-way split of authority over it (fork intent · this repo's ban rows · the adoption row · the gate-1 reviewers); a blocked spec filing (`docs/specs/relocate.md` still `OWED — not filed`); and an architect interruption that carried **design content** (three channels, the invalid arm, the layer question *"where does the arithmetic live"*) that belonged in the adoption record. **Nothing was implemented wrongly — the defect is that the requirement could not be read.**

---

## 2. THE FAILURE CLASSES (what actually broke, stated so each gets its own guard)

**F-1 — A NAME IS NOT A CONTRACT (signature-level semantic smuggling).**
The adoption copied a **parameter list** across a project boundary and treated it as the acceptance shape. This repo's own rule is the opposite: *a spec must be exhaustive enough that a TestWriter can derive every state and fail-state* — every method signature, return shape, throw pattern, valid state and fail-state. That rule was applied **to methods** and not **to their parameters**. A parameter with no declared **unit, domain, comparand and referent** is an unbounded requirement wearing a bounded-looking name.

**F-2 — THE SAME TOKEN ON TWO PROJECTS' OPPOSITE LISTS, WITH NO COLLISION CHECK.**
`threshold` was simultaneously (a) a legitimate injected policy value on the fork's side and (b) a **banned vocabulary token** on this repo's side (`P-5`/`R-1` scans with positive controls; `S-11`'s STOP). Neither the adoption row nor the ban rows reference each other. A reader of either document gets a confident half-truth. **The collision was discoverable by grep** — `grep -rn "\bthreshold\b" docs/` returns both families — and no gate step asks for that grep.

**F-3 — OWNERSHIP RECORDED WHERE SEMANTICS WERE NEEDED (a category error the records invited).**
*"Injected, never a mechanism default"* answers **who supplies it**; it cannot answer **what it measures**. The row's own framing (*"Binding rows"*) made the ownership statement look like the requirement, and one of the two gate-1 reviewers read it that way in good faith. The record did not merely omit the meaning — it **supplied a substitute that reads as one**.

**F-4 — NO DEFINITION-OF-TERMS AT THE BOUNDARY.**
The handoff review that carries the fork's asks is a **disposition ledger** (disposition · reason code · binding rows), not a glossary. The fork's own spec namespace — where `threshold` may well have had a unit — was **not consulted** when its identifiers were adopted. The boundary artifact records *verdicts about* the fork's requests, never the *meanings of* its words.

**F-5 — TWO-HOP DEFERRAL (`spec` → `architect`), i.e. the ambiguity was routed as if it were a detail.**
The ambiguity was deferred to the `E4` spec filing ("the spec must decide"), which deferred it back to the architect. Each hop was individually defensible; together they burned a full gate pass. The gate-1 record had no field that says **"these requirements are UNDEFINED and must be answered before delegability"** — the critique had to invent that field in prose.

**F-6 — ONE UNDEFINED WORD HID TWO DECISIONS (semantics and layer).**
Because the meaning was missing, so was the question *"which layer can even compute this?"*. The answer turned out to be load-bearing: a **distance** needs a pointer position and a zone box, and this repo's node layer **reads no coordinate and no geometry** (`gutter.md` `§0` ruling 2 / `I-11`; `S-d11`: *"the geometry this family produces is UNPROVABLE in this repo today — that clause must appear wherever geometry criteria are described"*). So the same gap also hid the **`[U]`-layer** half of the unit. A single undefined identifier can conceal both a requirement and its verification layer.

---

## 3. THE GUARDS — REQUESTED HARNESS MODIFICATIONS

**These are REQUESTS, not landed rulings** (the harness is the architect's). Each names its owner, its artifact and its acceptance test; `docs/pending.md` `§K` carries them as tracked rows.

### 3.1 A new role: the **HANDOFF-DRAFT SPECIALIST** (`role_handoff_drafter`)

**When it runs:** whenever an external ask (an upstream fork row, a `SCH-*` disposition, an `A-d*` ruling) is **adopted** into this repo as a unit — i.e. **between the adoption decision and the unit's spec filing**, and again at any later amendment of an adopted contract.
**Its deliverable: an ADOPTION DOSSIER** — one artefact per adopted unit, carrying:

1. **THE SEMANTICS TABLE — one row per adopted identifier** (every parameter, option, seam, callback, return field, error code and vocabulary token in the adopted contract): `identifier · kind · what it measures/decides · unit · domain (and the values outside it) · who supplies it · who evaluates it · where the arithmetic lives · the observable that proves it · the clause that pins it · STATUS (defined / undefined-until-answered)`. **Any row whose STATUS is `undefined-until-answered` blocks the gate-1 verdict from being `DELEGABLE`.**
2. **THE COLLISION REPORT:** every adopted identifier grepped against this repo's own prohibition/vocabulary rows (`P-*` tables, `R-*` anti-evasion scans, the `S-11` STOP list, `VALID_GROUPS`, the code/outcome unions) — with a **recorded reconciliation** for each hit, in the form *"the token is banned in layer X for reason Y, and legitimate in layer Z because …"*, or an explicit re-name request.
3. **THE LAYER MAP:** per behaviour, which layer can prove it (`[T]`/`[H]`/`[U]`/`[D]`), and — where the honest answer is *"nothing in this repo can prove it today"* — the three-part refusal clause the siblings carry.
4. **THE DEFINITION-OF-TERMS BLOCK** (the glossary that goes **into the unit's spec**, not just the dossier).
5. **THE OPEN-SEMANTICS LIST:** the identifiers still undefined, each with the question the architect must answer, and the recommendation.
6. **THE FORK-FACING RESTATEMENT:** what `docs/FORKER.md` must carry for the adopted names (the family's rule: the seam contract is the fork's downstream obligation).

**Its guardrails:** read-only on `src/**`/`tests/**`; it may write the dossier and (by delegation) the spec's glossary block; it **never** decides semantics itself — it either finds them recorded or files them as `undefined-until-answered`; it must cite the **upstream source** it read (the fork's own spec namespace, not only this repo's disposition rows).

### 3.2 Harness changes (process, in the order they would bite)

| # | Request | Where it lands | Acceptance test |
| --- | --- | --- | --- |
| **H-1** | **A PARAMETER-SEMANTICS GATE**: the gate-1 change-analysis may not return `DELEGABLE` for an externally-adopted unit whose adoption dossier has any `undefined-until-answered` row; the verdict vocabulary gains **`BLOCKED-ON-SEMANTICS`** with the open list attached | `AGENTS.md` item 8/9; the gate-1 record's own shape | `E4` replayed against the new rule returns `BLOCKED-ON-SEMANTICS` at step 4 (this session's `FLAWED`, in one word) |
| **H-2** | **THE CROSS-BOUNDARY COLLISION CHECK** as a gate step: every adopted identifier grepped against the receiving repo's prohibition tables, with the reconciliation recorded — **"a token may be banned in one layer and legitimate in another; the adoption must say which and why"** | the dossier (3.1 item 2) + the gate-1 checklist | `grep -rn "\bthreshold\b" docs/` returns both families; the dossier must name both |
| **H-3** | **NO BARE IDENTIFIER IN A CONTRACT**: a spec may not declare a parameter without a semantics row (unit/domain/referent/evaluator); a missing row is a spec-gate finding, exactly as a missing return shape is | `AGENTS.md` item 5 + the spec format | the `E4` spec cannot be filed with `threshold` undefined |
| **H-4** | **STOP QUOTING SIGNATURES AS ACCEPTANCE IN THE LEDGER**: a ledger row's "acceptance shape" cell must cite the **spec's semantics** (§ numbers), never re-quote a parameter list — the quote is what made the unit look specified | `docs/next-steps.md`'s `## OPEN` row template | the `E4` row after amendment cites `docs/specs/relocate.md §…` instead of the signature |
| **H-5** | **ONE-HOP ESCALATION**: an ambiguity found at gate 1 is escalated to the architect **in that pass** (a required *open-semantics* field in the gate-1 record), never deferred to the spec filing | the gate-1 record shape | this session's two-hop deferral (spec → architect) becomes impossible by construction |
| **H-6** | **A LAYER CLAUSE IN EVERY ADOPTION**: the dossier's layer map must state, per behaviour, whether any in-repo instrument can prove it — and where none can, the spec carries the three-part refusal | `AGENTS.md` item 5 + the family's existing refusal precedent (`gutter.md` ruling 11) | the `E4` ghost/expansion behaviours are declared `[U]`-only at filing time, not at gate 6 |
| **H-7** | **THE DECISIONS LINKAGE**: an architect ruling that answers an identifier's meaning is recorded as an ACTIVE `docs/decisions.md` row **and referenced from the unit's ledger row, its spec and its dossier** | the archival loop (item 6) | `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` is reachable from the `E4` row, the spec and the dossier |
| **H-8** | **A GLOSSARY IN THE FORK-FACING DOC** for every adopted name a fork must implement | `docs/FORKER.md` | the relocate seam/parameter glossary appears beside the seam-contract block the `E10` ruling already requires there |

### 3.3 What the harness should NOT change (so the fix is not over-applied)

* **The bans stay.** `threshold`'s presence on `P-5`/`R-1`/`S-11` is correct for the layers it guards (no consumer vocabulary, no policy default, no mechanism-side arithmetic). The fix is a **reconciliation step**, never a relaxation of a prohibition.
* **The reviewers' split was healthy.** Two reviewers reaching opposite admissible readings from the same records is the signal that the records were ambiguous — not a reason to merge the two passes or to soften either.
* **The `A-d4` ruling is untouched.** This RCA asks for a **pre-filing** guard; it does not re-open the adoption, the unit set, or any landed contract.

---

## 4. WHAT WAS ALREADY TRUE, AND STILL IS (so the RCA is not read as a process collapse)

* The **gate topology worked**: gate 1 stopped the unit before a spec, a red set or a line of code existed — the failure cost one review pass, not four implementer passes (contrast `E10`, whose red set had an unclosed contract hole and stopped four implementers: `docs/specs/gutter-ui.md`'s repair records).
* The **architect's ruling now exists** and is recorded with its derived conditions (`docs/decisions.md` `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`; `docs/pending.md`'s `SCH-7` annotation).
* The remaining `E4` decisions are **answerable without further architect input** except the two the spec must pin (the caller-supplied distance shape; the handle-capture path for the reset arm) — both already drafted in the ruling's row.

**Honest limits of this RCA:** it is written by the orchestrator that hit the failure, from the artifacts it read; it measured the **cost in gate cycles** (one pass, one blocked filing, one interruption) and **not** a monetary or schedule cost; and its guard set is **requested**, not landed — each request needs the architect's adoption and, for `H-1`–`H-8`, an `AGENTS.md`/template edit by a later pass.
