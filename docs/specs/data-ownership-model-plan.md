# The data-ownership model — a PLAN (four central stores, a layered read, commit-clears-lower, reference listeners)

Status: **PLAN — FILED 2026-10-01.** **A PLAN, NOT A SPEC-OF-BEHAVIOUR, NOT AN IMPLEMENTATION.** No unit
is admitted, no contract is filed, no code, test, register, leg or build is produced by this pass, and
**no existing file was modified** (this is the pass's only created file). Nothing in this document may be
read as authorising a unit, a store, a seam, a tool, a table or a config file.

**⟶ AMENDED 2026-10-01 (THE ANSWERED-DECISIONS PASS) — the status line above is the FILING pass's own
record and its *"no existing file was modified"* clause is TRUE OF THAT PASS. THIS REVISION IS A SECOND
PASS ON THE SAME DOCUMENT:** **it folds the architect's fourteen answered decisions in** (`§0`'s
`A-1`…`A-14`, `§9.1`'s decided ledger), **it adopts the TABS/FOCUS SLICE as the model's first tenant**
(`§1.7`, `§3.9`, `§4.3`, `§6.5`), **and it modifies THREE FILES — this plan, `docs/decisions.md` (two new
ACTIVE rows plus a dated `SUPERSEDED` marker beside the facility row), and the two `Q-11`
**annotate-beside** sites (`docs/pending.md`, `docs/specs/gutter-ui.md`).** **NOTHING IN THE AS-FILED
STATUS SENTENCE CHANGES IN SUBSTANCE: THE DOCUMENT IS STILL A PLAN — no unit is admitted by it, no
contract is filed by it, no code, test, register, leg or build is produced by it, and the ledger stays
`21 DONE / 0 open`.** **What changed is that its open questions are now a DECIDED LEDGER (`§9.1`), with
ONE named open question (`OPEN-1`).** **The amendment is DOCS-ONLY and ran nothing** (`§10`).

**WHAT THIS DOCUMENT IS.** The architect asked, verbatim:

> *"The complexity of these changes is a consequence of data architecture mismanagement and the data
> storage and caching will need to be centralized and modularized to support downstream expansions.
> Top-level ownership maintains four total data stores: [file-stored and synced persistent cache (config,
> settings, file tracking) that stores both the data and the file that persists it; in-memory persistent
> cache; in-memory temp cache; access-controlled, file-persisted security cache.] These have their own
> get/set functions, but for the non-security caches the default read method will be a function that
> searches them in ascending order of durability and returns the value and the found cache reference and
> name (ex. temp.leftSidebar.width). A commit to a higher-persistence store clears the value in a
> lower-persistence store. Event listeners can be added to specific references to update on change.
> Example use case: During pane drag, the function pushes updates to the temp cache when it finds a new
> valid placement. The cache write pings the event listener, which rerenders the zone. The zone render
> iterates the contained panes, and when it detects that the dragged pane's location data is in the temp
> cache, it can automatically ghost the preview. On release, the pane's location data is committed to the
> file-stored settings, clearing it from the temp cache and causing it to render normally on update."*

Their instruction to this pass, verbatim: ***"Plan data ownership model change."***

This document is the answer: **a plan** — the model stated precisely, the process/realm split, a ledger
of every value layer 1 mapped, the architect's drag example walked in this app's own terms, the
reconciliation with the landed record, a migration/unit split, what it fixes and what it makes worse,
costs and risks, and the questions only the architect can answer.

**⟶ SUPERSEDING STEER — THREE ARCHITECT ANSWERS LANDED AFTER THIS PLAN'S DRAFT, 2026-10-01, AND THEY
ARE FOLDED IN BELOW. READ THIS BLOCK BEFORE ANY SECTION, BECAUSE TWO OF ITS CLAUSES **REVERSE** WHAT AN
EARLIER DRAFT OF `§5`/`§8` SAID.**

**(A) THE SHARED MODULES MAY BE EDITED — the architect's words, verbatim:** *"The shared modules should be
edited to use the new data stores for owned data/settings and follow the event-listening paradigm for
update triggers."* **Consequences, all landed in this revision:** `§5.2` **is re-written** from *"no store
reaches `src/shared/**`"* to **a per-module store-dependency verdict for the fifteen fork-consumed
modules**, and **`§5.9` is NEW**: a one-row-per-landed-row itemization of everything that ruling
supersedes, each marked **SUPERSESSION (architect-only)** · **NEW CONTRACT (own gate)** · **COMPATIBLE
ADDITION**, with its cost. **The old blanket rule is RETRACTED in those words; the ledger row `2.5-6` is
re-classified** (**`§3.5`**, **`§3.7`**).

**(B) THE FORK RE-VENDOR COST IS ACCEPTED — a decision, not a risk.** *"Host-side only"* **is no longer a
design constraint**; **`§5.6` is re-written** to **retract the draft's *"the fork pin can be avoided"*
answer** and to **itemize exactly which modules move, what the fork must re-digest and re-run, and where
that obligation is recorded in this repo's fork-facing documents**. **The obligation is recorded BY THIS
PLAN as OWED to `docs/FORKER.md` and to `docs/pending.md`'s fork-request region — both are EXISTING FILES
this pass may not modify (`§10`), so the plan names the sites and the pass that owes them.**

**(C) THE ZONE-MINIMIZE LINE IS PARKED UNDER THIS MODEL — the architect's words, verbatim:** *"Park it —
the ownership model supersedes it."* **Consequences:** the minimized state, the zero-means-minimized
mapping and the member's location are **re-opened as STORE-VALUE questions** (**`§1.6`**, new), the parked
unit's **four undefined semantics are ABSORBED into `§1.6`/`§2`/`§9`** rather than left as a separate
unit's open list, and **`§6`/`§7`** state the parking with its dependency change.

**(D) THE FOURTH DUTY.** **`§3.8`** (new) states **which of the four stores the security cache's values may
NOT be read from**, its read path and its refusal — **as a marked rule, not an assumption.**

**⟶ THE ARCHITECT'S ANSWERED DECISIONS — ALL FOURTEEN QUESTIONS ANSWERED 2026-10-01, AND THE
TABS/FOCUS SLICE ADOPTED AS THE MODEL'S FIRST TENANT. READ THIS BLOCK BEFORE `§1.6`/`§1.7`, `§2.5`,
`§3.9`, `§4.3`, `§5.1`, `§5.2.6`, `§5.6.5`, `§5.9.1`, `§6.5`, `§7.1`/`§7.3`, `§8.7` AND `§9.1`,
BECAUSE IT CHANGES WHAT SEVERAL OF THEM SAY AND BECAUSE `§9` IS NO LONGER A LIST OF OPEN QUESTIONS: IT
IS A DECIDED LEDGER (`§9.1`).** **Every answer below is the ARCHITECT'S; this pass FOLDS EACH ONE IN IN
THE PLAN'S OWN VOICE AND TAKES NONE OF THEM ON ITS OWN AUTHORITY.** **The answers, one line each, with
the section that now carries them:**

**(A-1) `Q-1` — THE REALM SPLIT, REVISED: TIER 1 `file` IS RENDERER-OWNED AND WRITTEN THROUGH A
MAIN-SIDE CHANNEL; `mem` AND `temp` LIVE IN THE RENDERER; `secure` STAYS MAIN-ONLY.** There is **NO
read-through mirror** (so `§7.3`'s `NW-1` is **DELETED**, with a dated tombstone saying why), the
crossings **INVERT** (boot hand-off/hydration and the commit channel are renderer→main / main→renderer,
with the exact shape and per-commit cost), the **atomic `${path}.tmp` + `renameSync`, the `fsync` and the
corruption-recovery duty MOVE BEHIND THAT CHANNEL** (and `src/main/security-store.ts`'s non-atomic
`writeFileSync` is **named as the pattern NOT to copy**), and the **boot ORDER changes** because the
renderer now owns the file's values. **Lands at `§2.5`, with the `§2.1`/`§2.2` cells annotated beside
(`RCA-8(d)`).**

**(A-2) `Q-4` — THE FACILITY ROW: `NO-FOUNDATION-CONFIG-FILE-FACILITY` IS SUPERSEDED EXPLICITLY.** A
**NEW ACTIVE row beside it**, the old row **kept visible with a dated `SUPERSEDED` marker and a
pointer**, the old row's bytes **not rewritten**; the new row lands in `docs/decisions.md` **in this
pass** and the fork-facing `### PERSISTENCE` block is **OWED its re-write** (`§5.1`, `§5.6.4` (a),
`§9.1` `Q-4`).

**(A-3) `Q-2` — SECURITY READS: THE RENDERER NEVER READS TIER 4.** The **snapshot + the manual-UI
channel + `maxJournalLength` are KEPT**, and a **TYPED REFUSAL** stands for any `read`/`subscribe` on
`secure.*`; `§3.8` keeps its **three forbidden read paths** (`§3.8`, `§9.1` `Q-2`).

**(A-4) `Q-5` — THE MODULE REGISTRY FOLDS INTO TIER 1**: `provident-modules.json`'s records and the
per-module `disabled` flags **migrate into the settings file**, with the **SHA-256 per-record
re-verification's new home**, the **atomic-write discipline** and the **boot order** stated (`§3.9`
item (iii)).

**(A-5) `Q-6` — THE NAME REGISTRY: THE STORE OWNS A DECLARED NAME REGISTRY (A SCHEMA).** **Undeclared
names are REFUSED AT WRITE TIME**; a name **declared twice**, or with a **wrong tier segment**, is
refused; **reserved names exist** (the landing tab's reference, `§1.7` item 7). The registry gets **its
own failure-mode table** and is named as the store's **SECOND CONTRACT SURFACE** (`§1.8`).

**(A-6) `Q-7` — EVENTS: ONE clear-then-notify event per affected reference**, emitted **after the higher
tier accepted the write**, carrying **`cleared[]`** (`§1.5`'s recommendation is now the DECISION;
`§9.1` `Q-7`).

**(A-7) `Q-3` — THE CONSTANTS: the channel names and the tier constants live in a HOST-SIDE FILE SHARED
BY MAIN AND PRELOAD** — **NOT** the vendored `src/shared/types.ts`. `§2.4`'s option (a) is taken and the
fork list is amended accordingly (`§2.4`, `§5.6.5`).

**(A-8) `Q-8` — NO SESSION-LEVEL CHANGE CHANNEL: the session reads/writes store values and uses the
store's OWN `subscribe`; NO MEMBER IS ADDED to the frozen `gsession.md` `§2.5` delegate surface.** The
frozen-surface reason is recorded as a decision (`§5.4`, `§9.1` `Q-8`).

**(A-9) `Q-9` — SUPERSEDED BY THE TABS MODEL (`§1.7`).** The **renderer holder stops being the
authority**; **`RH-4` is answered by the tabs slice**, not by a cap on the holder (`§7.1`).

**(A-10) `Q-10` — HAZARDS TAKEN: `RH-1` FOLDS INTO THE CORE UNIT'S LIFECYCLE** (a generation that never
disposes leaves **live listeners on a dead generation**, so **disposal becomes a correctness
prerequisite**); **`RH-3` IS TAKEN** (cap the pane graph's journal; stop the per-reply `refreshDebug`
burst) with **its own contract rows**; **`RH-2` IS TAKEN WITH ITS CONTRACT GATE** — it **supersedes
`docs/specs/gutter-ui.md` §2.3 row 16's out-of-contract *"the wiring does not re-attach"* ruling**, the
owed amendment is **RECORDED AND ROUTED** and **`gutter-ui.md` is NOT edited** by this pass. `RH-5` and
`RH-7`…`RH-11` stay tracked with their falsifiers (`§7.1`).

**(A-11) `Q-11` — THE CITATION DRIFT, ANNOTATED BESIDE AT ALL THREE SITES.** This repo's `scripts/` holds
exactly `electron-divergence.mjs`, `electron-spawn.mjs`, `electron-ui.mjs`, `mcp-cli.mjs`; there is **no
`scripts/live-drive.mjs`**. The real drivers are named per leg — **`scripts/electron-ui.mjs` for the `ui`
leg · `scripts/mcp-cli.mjs` for the MCP route · `scripts/electron-divergence.mjs` for the divergence
leg** — and the fork's `live-drive.mjs` is named as **the FORK's**. **No cited clause was rewritten**
(`§8.6`; `docs/pending.md`'s `E10` spec-filed row; `docs/specs/gutter-ui.md` `§5.2` leg 6 and its `§5.1`
DENIED-item-6 row).

**(A-12) `Q-12` — THE PARKED ZONE-MINIMIZE SEMANTICS STAY PARKED** and are **absorbed as store-value
questions `ZQ-1`…`ZQ-4`** (`§1.6`), with the park recorded (`§7.4.1`, `§9.1` `Q-12`).

**(A-13) `Q-14` — THE FORK-FACING RECORDS: ONE documentation pass AFTER `U-STORE-MODULES` LANDS**,
recorded as **OWED now**, with the owning pass named and the files named — **`docs/FORKER.md` §4, the
`docs/pending.md` fork-request region, and the feedback document** (`§5.6.4`, `§6.5`).

**(A-14) THE TABS/FOCUS SLICE — THE MODEL'S FIRST TENANT (`§1.7`, `§3.9`, `§4.3`, `§6.5`).** `tabs` is a
**top-level store object owned by tier 1**; the active tab is a **per-tab property `active=true` under a
FIRST-CLASS CONSTRAINT (exactly one tab carries `active=true` while any tabs exist)**; **constraints are
a first-class model element** evaluated on every write with a stated outcome (**the violating write is
REPAIRED**, and the exactly-one-active case is the model's first repair arm); the tab list is **unbounded
but prunable** and **removal happens only through the close verb, which removes the tab from the FILE
STORE** — making **`remove(name)` a first-class store operation** (and **`set(name, undefined)` is NOT a
deletion and is NOT a third state**); **closing the active tab REPAIRS** (the next surviving tab is
activated in the same write) and **closing the LAST tab opens the LANDING PAGE AS A TAB**, a **reserved
reference in the registry that cannot be removably empty**, so **exactly-one-active is unconditional**;
**focusing a target verifies renderability first through a HOST-SIDE query** (the runtime already
resolves nodes — `src/renderer/runtime.ts` `elementForNodeId(id) → unknown | null`, `[H]`), and **an
unrenderable target opens the tab showing an ERROR PAGE**; the **error and landing pages are
provident-authored surfaces** (envelope-authored nodes + bounded wiring roles) and **each owes a `§5.U`
live row**; **`unknown-id` becomes UNREACHABLE from the focus verb**, so the amendment debt is
`docs/specs/mcp-endpoint.md` §3.8 **and** `docs/specs/focus-tool.md`'s refusal rows — **UNDER THEIR OWN
GATE, ROUTED NOT PERFORMED** — while the **refusal union stays FUNCTION-INTERNAL (it is not passed to
the store), so NO `focus-model` register re-grain is owed.**

**AND THE TWO HARD RULES THIS BLOCK CARRIES, STATED SO THE AMENDMENT IS NOT OVER-READ.** **(a) NO UNIT IS
ADMITTED BY THIS PASS** (`§6.5`): the ledger stays **`21 DONE / 0 open`** and **`RCA-8(f)` admits no
successor row — only the architect admits rows**; this plan's units remain **PROPOSALS**, and **no count
moves anywhere.** **(b) THIS AMENDMENT IS A DOCUMENTATION PASS**: no `src/**`, no `tests/**`, no
`package.json`, no script, no config, no `AGENTS.md` row, no `docs/next-steps.md` row, no
`docs/defects.md` row and no `docs/HANDOFF.md` round; **nothing was run** (no suite, no leg, no build, no
Electron boot) and **no file was written under `<Astrographer>/`** — the files this pass *did* write
beside this plan are `docs/decisions.md` (the two new ACTIVE rows) and the **annotate-beside** sites
`Q-11` names.

**READ THIS WITH THE TWO AUDIT LAYERS, WHICH ARE THE GROUND TRUTH THIS PLAN BUILDS ON AND WHICH IT DOES
NOT RE-DERIVE.** **Layer 1** = `docs/specs/foundation-app-data-model.md` — the storage/authority map
(**its `§2` tables are this plan's `§3` input, row for row; its `§3` authority table, its `§4` boundaries,
its `§5` deliberate absences `A-1`…`A-9`, its `§6` worked "where would a new value live" case, its `§7`
findings `F-1`…`F-15`**). **Layer 2** = `docs/specs/foundation-app-data-model-retention.md` — lifetime /
retention / flow (**its `§1` lifetime table, its `§2` re-derivation ledger, its `§3` listener inventory,
its `§4` unbounded-growth audit, its `§5` four end-to-end flows, its `§6` hazards `RH-1`…`RH-11`**).
**Both are `RESEARCH RECORD`s filed 2026-10-01 and both are `PARKED PENDING` at `docs/pending.md` `§P`.**

**THE LAYER LABELS — CARRIED FROM THE REPO'S OWN DECLARATION** (`docs/specs/ci-ui-leg.md`, *Layer
declaration*, the table both audit layers carry). **Every behavioural claim below carries one, and no
claim may be read on a layer it does not carry:**

| Label | Layer | What it is |
| --- | --- | --- |
| `[T]` | node suite / pure module | this repo's vitest files under the DOM shim; **never assembled-app evidence** (no window, no IPC, no transport) |
| `[H]` | host-side | this repo's `src/**` — main process, preload, renderer wiring |
| `[X]` | shim leg | `src/shared/dom-shim.ts` and the shim battery host (`src/main/battery-host.ts`) |
| `[A]` | divergence leg | `npm run divergence` — structural-surfaces-only identity evidence, never IPC-layer |
| `[U]` | real-DOM leg | `npm run ui` — a real `BrowserWindow` under a scratch profile; **not the packaged app** |
| `APP` | assembled app | a reading from the running assembled app (boot + key DOM). **No such reading exists in this pass.** |

**THE HONEST HEADLINE, STATED FIRST SO NO READER INFERS IT LATER.** *This pass ran no suite, no leg
(`ui`/`divergence`/`battery`), no `npm test`, no `tsc`, no `typecheck:tests`, no build, no Electron boot,
no MCP session, no battery and **no `git` command** (`§10`).* Every figure in this document is either
**this pass's own file read** or **a figure quoted from a named spec/decision/audit section with that
ownership stated**. **Every behavioural claim about `src/**` in this plan is `[H]` unless labelled `[T]`,
`[X]`, `[U]` or `APP`, and no `[H]` reading is app evidence.**

**ONE CONVENTION, STATED ONCE.** *"Moved into store N"* in `§3` means **the value's home changes and the
existing reader/writer sites are re-pointed in the same unit** — never that the value is duplicated. A
**duplicate** home is the failure class this plan exists to name (`§7`'s "makes worse" rows), not a move.

---

## §1. The model, stated precisely

### §1.1 The four stores, one subsection each

**THE ONE-LINE SHAPE.** Four stores, **four tiers**, **a single read that falls through the three
non-security tiers in ascending order of durability**, **a commit that clears the lower tiers**, and
**per-reference listeners**. **The security tier is excluded from the fall-through read by the
architect's own sentence** (*"for the non-security caches the default read method…"*) — that exclusion is
the model's single most important safety property and `§2.3` makes it enforceable by row.

#### Store 1 — `file` : the file-stored, synced persistent cache

| Property | Value for this repo (with the anchor) |
| --- | --- |
| **What it owns** | **config, settings and file tracking** — the architect's three words, taken literally. In this tree that is: (a) the **launch-config defaults** (`--mcp-transport=` / `--mcp-port=`'s defaults, `src/main/main.ts` `transportFromArgs`/`portFromArgs`, `[H]`); (b) the **backend's three injectable timeouts** — `readyTimeoutMs`/`invokeTimeoutMs`/`largePayloadBytes`, whose **option members already exist** and whose only values today are the constructor defaults `30000`/`60000`/`1_000_000` (`src/main/mcp-server.ts` `RendererBackend` constructor, read this pass `:1043-1045`, `[H]`); (c) the **committed layout** and the **theme setting** (`§3`); (d) the **window geometry** (`§3` — an absence today, `F-10`); (e) the **tracked-file list** (`§3` — new). |
| **Durability** | **highest of the three non-security tiers**: it survives a process exit. |
| **Lifetime** | **the installation** — bounded only by an operator's deletion of the file. |
| **Scope** | **⟶ REVISED 2026-10-01 (`Q-1`, ANSWERED): THE RENDERER OWNS TIER 1'S VALUES AND WRITES THEM THROUGH A MAIN-SIDE CHANNEL.** **The `main` process still owns the FILE** (only `main` has `node:fs`, and `contextIsolation: true` / `nodeIntegration: false` keep it that way), **and it is the only writer of the file's bytes** — but its role is **the CHANNEL and the atomic-write duty, not the authority**: the values live in the renderer's own `file` table, and **`main` persists what the renderer hands it.** **THERE IS NO READ-THROUGH MIRROR** — the as-filed clause *"with a read-through mirror in the renderer realm — `§2.1`"* is **WITHDRAWN in those words**, because a renderer that owns the values **is not a mirror of anything** and the second-holder hazard the mirror created (`§7.3` `NW-1`) **therefore does not exist**. **The revised split, its crossings (`Y-1`…`Y-3`), its per-commit cost, the atomic/`fsync`/recovery duty behind the channel, and the changed BOOT ORDER are `§2.5`** (with `§2.1`/`§2.2` annotated beside it, `RCA-8(d)`). |
| **Access control** | **none beyond the manual-UI-only discipline** (`docs/specs/mcp-endpoint.md` `§6.4`): it is an operator-owned tier, **not** an agent-reachable one. **Not** the security tier's access control. |
| **Its file, and how it is written** | `<userData>/provident-settings.json` — (**proposed name**; the architect's "stores both the data and the file that persists it" is read as **the tier owns both the record and its carrier path**). **WRITTEN ATOMICALLY: `${path}.tmp` + `writeFileSync` + `renameSync`** — the landed precedent is `src/main/module-store.ts` `persist()` (read this pass `:130-140`, its own `F1 (adversarial)` comment naming the crash-truncation it prevents, `[H]`), and **the non-atomic contrast is `src/main/security-store.ts` `persist()`'s plain `writeFileSync`** (`:49-57`, read this pass, `[H]`). **This plan REQUIRES the atomic shape for every tier-1 file**; adopting the security store's non-atomic shape is a finding. **⟶ EXTENDED 2026-10-01 (`Q-1`, ANSWERED): THE ATOMIC DUTY LIVES BEHIND THE MAIN-SIDE CHANNEL AND BELONGS THERE.** Because the WRITER is `main` (`§2.5`), **the atomic `.tmp` + `renameSync`, the directory create, the `fsync` before the rename, and the corrupt-file recovery at read-back are the CHANNEL's obligations, not the renderer's and not the tier table's** — the renderer cannot touch a path, and a renderer-side "persist" would be the non-atomic shape by construction. **`src/main/security-store.ts` `persist()`'s plain `writeFileSync` (read this pass `:49-57`, `[H]`) is the pattern this channel is NAMED NOT TO COPY, and the channel's own contract carries the four rows (atomic replace · `fsync` · corrupt-at-read-back falls back to the registered defaults, never a throw · a refused persist returns a RECEIPT, never a swallow).** **The tier's `fsync` figure is a `[H]`-layer obligation with a `[T]`-shaped row (a temp-file-then-rename is observable in a shim-hosted realm); no timing figure is claimed.** |
| **Failure modes** | (1) **a refused/throwable write** — must surface as a **receipt** (`{status:'refused'}`) and **must NOT clear the lower tiers** (`§1.4` rule C-3); (2) **a corrupt file at boot** — falls back to the tier's registered defaults, never a throw (the `security-store.ts` `sanitize` precedent, read this pass, `[H]`); (3) **a cold tier** (no file yet) — a miss, not an error; (4) **a missing directory** — `mkdirSync(recursive)` first (both landed stores do this, `[H]`); (5) **⟶ REVISED 2026-10-01 (`Q-1`, ANSWERED): a main-side writer the renderer did not cause** — the as-filed clause *"a second main-side writer — the renderer mirror goes stale"* is **WITHDRAWN with the mirror**: with no mirror there is nothing to go stale, and the residual hazard is the inverse one — **a value written to the FILE by anything other than the channel is invisible to the renderer's own `file` table until a re-hydration**, which is **`§2.5`'s `Y-3` push path** (specified, and **a declared no-op on today's single-window app**); (6) **a channel-level write failure** — the receipt is the ONLY refusal channel (`§2.2`'s as-filed cost clause 3, now `§2.5` `Y-2`), so **a commit site that discards its receipt is a FINDING** (`L-5`/`ADV-GU-1`); (7) **a partial migration of the module registry** (`§3.9` item (iii)) — the settings file and `provident-modules.json` disagreeing for one boot is a **declared one-boot window with its own row**, never a silent double authority. |
| **Get/set surface** | **`get(name)` → `{found, value, name}`** (tier-local, no fall-through) · **`set(name, value)` → a receipt** (atomic persist, then the clears) · **`commit(name, value)`** for a value whose *lower* tiers must be cleared · **`subscribe(name, fn)`** (`§1.5`). **All four are the tier's own; the layered read is a separate function that consults all three non-security tiers** (`§1.3`). |

#### Store 2 — `mem` : the in-memory persistent cache

| Property | Value for this repo (with the anchor) |
| --- | --- |
| **What it owns** | **process/realm-scoped state that must outlive a lower tier's lifetime but need not survive a restart**: the **focus holder** `{entries, activeId}` (today a module-level `const` in `src/renderer/renderer.ts`, `[H]`, layer 1 `§2.4` row 1), the **working layout record** (the `sizes` lookup + the placement/slot keys the consumer passes to `computeTrackVars`/`withinProximity`; **nothing in this repo holds it today** — layer 1 `§3`'s *"Layout … nobody in this repo — the CONSUMER"* row), and **the bounded last-commit diagnostic** that replaces the dying `writes` array (`§3` row 2.4-3). |
| **Durability** | **second of three** — survives every graph re-derivation (`load`/`code.load`/`loadDoc`/journal base-restore) and is released only by a realm teardown (`did-finish-load`) or a process exit. |
| **Lifetime** | **per realm** (renderer) — the same lifetime the focus holder already has, and the one layer 2 `§1` row 8 documents as **deliberate** (`docs/specs/focus-tool.md` `§2.1` item 6 / `§2.3` item 5 pin the holder as the live authority, `[T]`-documented). |
| **Scope** | **the renderer realm** — `§2.1` decides and justifies. |
| **Access control** | none (it holds no secret; **it may not hold a `secure.*` reference at all** — `§1.3` rule R-4). |
| **File** | **none** (the architect's own words: *"in-memory"*). A tier-2 value that must survive a restart is **promoted to tier 1** — that promotion is the `mem`→`file` edge and it is what the drag example's release hop is. |
| **Failure modes** | (1) **realm death loses it** — by construction, and the same way the focus holder is lost today (layer 2 `§1` row 8's *"released (the realm owns the module)"*); (2) **an unbounded collection in it is unbounded** — so **this plan REQUIRES every tier-2 collection to carry a declared cap**, which is precisely the mechanism that fixes `RH-4` (the focus holder's uncapped `entries`); (3) **a stale mirror of tier 1** — `§7`. |
| **Get/set surface** | as tier 1, plus **`clear(name)`** (removal alone, no higher-tier commit) and **`has(name)`** (the tier-local presence test the fall-through needs). |

#### Store 3 — `temp` : the in-memory temp cache

| Property | Value for this repo (with the anchor) |
| --- | --- |
| **What it owns** | **in-flight, per-episode state that has no meaning after its episode ends**: the **dragged pane's placement candidate** (the architect's *"when it finds a new valid placement"*), the **preview value** (the visible revert's input), and the **pre-drag reading** a reset needs. **Nothing in this repo holds these as data today** — the only in-tree carrier of an in-flight drag value is the **DOM inline `style.width` write** (`src/renderer/renderer.ts` `applyPreview`, `[H]`; layer 1 `§2.4` row 4), i.e. **presentation only, no data home.** |
| **Durability** | **lowest of three** — cleared by the episode's end, by a commit to any higher tier, and by a realm teardown. |
| **Lifetime** | **per episode** (in the drag case: one gesture). Its entries are expected to be **short-lived by construction**; a tier-3 entry alive at a gesture's terminal is a finding. |
| **Scope** | **the renderer realm** — it is the hot path's tier and it must be **synchronous and in-realm** (`§2.1`). |
| **Access control** | none. |
| **File** | **none** (the architect's own words: *"in-memory temp"*). |
| **Failure modes** | (1) **an un-cleared entry leaks into the next episode** — this is the `RH-6`-class growth, so **the tier carries a declared entry cap and a terminal-time sweep**; (2) **a hot reference re-notifying too often** (`§8`'s re-render risk); (3) **a lost entry mid-episode** — the consumer's `preDragSize` (its own seam reading) is the recovery, exactly as `docs/specs/gutter-ui.md` `§2.5` item 3's revert arms already work, `[T]`-documented. |
| **Get/set surface** | as tier 1 (get/set/has/clear/subscribe). |

#### Store 4 — `secure` : the access-controlled, file-persisted security cache

| Property | Value for this repo (with the anchor) |
| --- | --- |
| **What it owns** | **the operator's security settings `{token, enabled[], maxJournalLength?}`** — today the closure `current` of `src/main/security-store.ts` `createSecurityStore` (read in full this pass, `[H]`) plus the file `<userData>/provident-security.json` (`src/main/main.ts` `createSecurityStore({path: join(app.getPath('userData'), 'provident-security.json')})`, read this pass `:71-73`, `[H]`). **That file, that path and that value are the tier's whole content, and they are ALREADY a security cache in the architect's sense** — this tier is the model's only store whose referent already exists. |
| **Durability** | **highest** — and it is deliberately **outside the durability ordering the fall-through reads** (the architect's own sentence excludes it). |
| **Lifetime** | the installation (the file), with a per-process in-memory `current`. |
| **Scope** | **`main` ONLY.** The renderer never reads the tier through the generic read; it reads a **snapshot** over the existing `provident:security:get` channel (`src/main/preload.ts` `security.get`, `[H]`). |
| **Access control** | **the landed discipline, unchanged, and this plan's hardest constraint:** the tier is reachable **only** from (a) `main`'s boot gate construction, (b) the manual-UI IPC handlers `IPC_SECURITY_GET`/`IPC_SECURITY_SET` (`src/main/main.ts` `:93-99`, read this pass, `[H]`), and (c) the operator pane's snapshot read. **NOT from any MCP tool, resource, or group** — `docs/specs/mcp-endpoint.md` `§6.4` (*"manual-UI-only by construction: the IPC channel is main→renderer→main, the MCP tool handlers never route to it"*) read this pass, and layer 1 `§5` absence `A-7` (*"An agent **cannot grant itself capabilities**"*). **And the generic read REFUSES every `secure.*` reference with a typed refusal** (`§1.3` rule R-4) — so "the security cache is not in the fall-through" is **a testable row, not an intention**. |
| **File, and how it is written** | `<userData>/provident-security.json`, **and this plan REQUIRES the atomic shape** (`.tmp` + `renameSync`), because the landed `security-store.ts` `persist()` is a **plain `writeFileSync`** (read this pass `:49-57`, `[H]`) — a crash mid-write can truncate it. **That change is a behaviour change with its own row** (`§6`'s `U-STORE-SECURITY`). |
| **Failure modes** | (1) **a corrupt file** → the landed fallback (defaults, never a throw; read this pass `:45-47`, `[H]`); (2) **a persist failure** → today **caught and ignored** (`security-store.ts` `persist()`'s own comment, read this pass: *"the in-memory config still applies for this process lifetime"*) — this is layer 1 `F-6`'s swallow; **the plan requires a receipt so the divergence is visible, and the two-holder shape itself (`current` + `SecurityGate._config`) is NOT fixed** (`§5` conflict 4, `§7` `F-6`); (3) **a renderer read of the token** — **forbidden**; the token is a pane **snapshot** only. |
| **Get/set surface** | **its own get/set, and its own only**: `get()`/`set(patch)` as they stand today, plus a **snapshot** projection for the pane. **`secure.*` references are legal only inside this tier's own API**; the generic `read`/`commit`/`subscribe` refuse them. |

### §1.2 The layered read — the one function, its return shape, its reference grammar

**THE RULE (the architect's, restated as a rule with an order and a terminator).**
**`read(name)` searches the tiers in ASCENDING order of durability — `temp`, then `mem`, then `file` —
and returns the FIRST tier holding the reference at its own level, together with THAT TIER'S OWN REFERENCE
AND THE RESOLVED NAME.** The search **stops at the first hit** (a lower-tier value shadows a higher-tier
one — that is what makes an in-flight value win over a committed one). **A miss in all three returns
`{found:false, value:undefined, tier:null, name}`** — never a throw, never an invented default (the
family's *"no policy defaults"* discipline, `docs/specs/zones.md` `§2.2` `P-3`, `[T]`-documented).

**THE RETURN SHAPE, EXACT.** `read(name) → { found: boolean, value: unknown, tier: 'temp'|'mem'|'file'|null, cache: <the tier's own store object>, name: string }`.
The architect asked for *"the value and the found cache reference and name"* — so **the tier object
itself is returned**, and **the resolved name is a fully-qualified dotted reference** in the grammar below.

**A BOUNDARY FACT THIS SHAPE OBLIGES, AND IT IS A FINDING, NOT A DETAIL.** **`cache` is a LIVE OBJECT
REFERENCE and therefore cannot cross an IPC boundary** — `docs/specs/mcp-endpoint.md` `P-E6` (*"JSON-safe
boundary: args/results never carry live objects or functions"*, read this pass) and `§4.2`'s *"live engine
objects … must be projected or kept inside"*. **Consequence: a layered read whose answer has to cross
main↔renderer must return a SERIALIZABLE TIER TOKEN instead of the object** (`tier: 'mem'`, plus the
name). **This is why `§2.1` puts the fall-through read in the renderer realm** — the architect's shape is
only faithfully implementable on one side of a boundary, and the two in-memory tiers are the ones a hot
path needs.

### §1.3 The naming scheme for references (grammar, ownership, stability)

**THE GRAMMAR (proposed — no such grammar exists anywhere in this tree today; a grep of `docs/**` and
`src/**` for the architect's example returns nothing, and layer 1/2 record no naming scheme).**

```
<name>  ::= <tier> "." <namespace> "." <path>...
<tier>  ::= "temp" | "mem" | "file" | "secure"
<namespace> ::= the CONSUMER's own segment (its own word; opaque to the store)
<path>      ::= one or more caller-chosen segments, joined by "."; a segment is a non-empty string
```

**The architect's own example parses as `temp` / `leftSidebar` / `width`.** **Worked examples this plan
proposes (`§3`, `§4`), all marked as proposed:** `temp.drag.<gestureId>.placement` ·
`mem.layout.pane.<paneId>.size` · `file.settings.pane.<paneId>.size` · `file.window.bounds` ·
`secure.operator.token` (tier-internal only).

**FIVE RULES THE GRAMMAR CARRIES, EACH WITH ITS REASON — and each is a row a unit can FAIL.**

- **R-1 — THE STORE OWNS NO VOCABULARY.** The store ships **no** pane/zone/tab/track token, no
  `is-empty`/`is-minimized`/`is-revealed` literal (the mirror-class taxonomy **BANNED** at
  `docs/specs/container.md` `P-CT-1`, with `H-r15`'s hazard that it *"resurrect[s] `SCH-10`/`SCH-4` under
  a new name"*), and no unit string. **Every segment after the tier is the caller's string, carried
  verbatim** — the same opacity discipline the family already applies to `edge` (`E5-B-2`,
  `docs/decisions.md` `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`, cited by row
  name) and to `zoneId`.
- **R-2 — ONE SPELLING, ONE HOME.** A reference string is spelled **exactly once**, in **one host-side
  declaration** (**proposed: `src/main/store-channels.ts`'s sibling `storeReferences`, or a renderer-side
  equivalent — `§2.4`**). **This is the `F-8` lesson applied in advance**: the `provident:invoke` channel
  name is a literal in `src/main/mcp-server.ts` `RendererBackend.invoke` while the preload subscribes with
  the `IPC_INVOKE` constant, and **no row pins the agreement** (layer 1 `§7` `F-8`, `[H]`).
- **R-3 — A NAME IS STABLE WHILE IT IS DECLARED ONCE.** A name is *stable* iff every reader and writer
  resolves it from the declaration rather than re-spelling it. **A second literal spelling of the same
  reference is a FAIL**, and a rename that moves the declaration moves every site with it.
- **R-4 — `secure.*` IS REFUSED BY THE GENERIC SURFACE.** `read`, `commit`, `subscribe` and `clear`
  **REFUSE any `secure.*` reference with a typed refusal** (never a silent miss). **Reason: the
  architect's own fall-through sentence excludes the security cache, and a generic read that could return
  it would make `§6.4`'s manual-UI-only property unenforceable** (`docs/specs/mcp-endpoint.md` `§6.4`,
  layer 1 `§5` `A-7`).
- **R-5 — NO REFERENCE NAMES AN ENGINE ID.** A `path` segment **may not be an engine node id, a
  `data-node-id` value, or a css.id/props.id** in the store's own vocabulary. **Reason: `cssIndex`/
  `propsIndex` are already a *second holder of the element-id kind* against the engine's registry (layer 1
  `§7` `F-5`); a store keyed by node ids would be a THIRD holder of the same kind.** The caller may put a
  component's own id string inside its own namespace segment — the store just may not treat it as an id.

**⟶ TWO RULES ADDED 2026-10-01 (`Q-6`, ANSWERED — see `§1.8`, which carries the registry's own
failure-mode table, and `§1.7` item 7 for the reserved names).**

- **R-6 — THE STORE OWNS A DECLARED NAME REGISTRY, AND AN UNDECLARED NAME IS REFUSED AT WRITE TIME.**
  The registry is **a SCHEMA**: every reference a `read`/`set`/`commit`/`remove`/`subscribe` may name is
  **declared once**, with its tier segment and its declared lower aliases (`R-2`/`C-4`). **`R-1` IS NOT
  WEAKENED BY `R-6`:** the store still ships **no** pane/zone/tab token, **no** `is-empty`/`is-minimized`/
  `is-revealed` literal and **no** unit string — **a declared name is a declaration of the CALLER'S
  spelling, not a vocabulary the store owns**, and the registry's own bytes are scanned by the same
  `P-CT-1`/`H-r15` negative the store's source carries (`§5.7` `FAM-3`). **A name declared TWICE, or
  declared with a WRONG tier segment (`mem.…` in the `file` table), is REFUSED** — this is the
  **`F-8` lesson made mechanical**: *one spelling, one home* stops being a convention and becomes a
  refused write. **The registry is therefore the store's SECOND CONTRACT SURFACE** (the first is the read/
  commit/event surface), and `§1.8` states its failure modes.
- **R-7 — RESERVED NAMES EXIST, AND THEY CARRY A NON-REMOVABLE OBLIGATION.** A reserved reference is a
  declared name the store itself depends on for the model's own invariants: today **exactly one** —
  the **landing tab's entry** (`§1.7` item 5), which **cannot be removably empty** because
  exactly-one-active is unconditional. **`remove()` on a reserved reference is REFUSED with a typed
  refusal**, and the refusal is by **name**, never by value (so a positive control is available:
  the same call against a declared non-reserved name succeeds).

### §1.4 The commit-clears-lower rule (rule C, five clauses)

**C-1 — A COMMIT TO TIER k CLEARS THE SAME REFERENCE IN EVERY LOWER-DURABILITY TIER** (`file` clears
`mem` and `temp`; `mem` clears `temp`; `temp` clears nothing). **A commit NEVER clears a higher tier.**
**C-2 — THE CLEAR HAPPENS AFTER THE HIGHER TIER HAS DURABLY ACCEPTED THE VALUE, NEVER BEFORE**: the
write lands, then the lower copies go. Order matters because C-3 makes the failure path non-destructive.
**C-3 — A REFUSED/THROWABLE COMMIT CLEARS NOTHING.** If the higher tier answers `{status:'refused'}` (an
atomic-persist failure, a full temp cap, a malformed name), **the lower tiers keep their values** — the
alternative silently destroys the working value and is the exact class of silent data loss the `F1
(adversarial)` comment in `src/main/module-store.ts` was written to prevent (`[H]`, read this pass).
**C-4 — A CLEAR IS BY REFERENCE, NOT BY TIER, AND IT IS NOT RECURSIVE.** Committing
`file.settings.pane.p7.size` clears `mem.layout.pane.p7.size` and any `temp.*` reference **bound to the
same logical slot**; the binding is **declared, not inferred** (an inferred binding by suffix-matching is
the *"second authority over the same value"* class and is refused). **Proposed mechanism: a committed
reference declares its lower aliases in one declaration row** (e.g. `file.settings.pane.p7.size` ↔
`mem.layout.pane.p7.size`), and **a commit to a reference with no declared alias clears nothing**.
**C-5 — THE COMMIT IS THE ONLY PATH THAT CLEARS.** An episode's end (`§3`'s terminal sweep) clears temp
entries **without** a commit — that is a **`sweep`**, a distinct operation with its own receipt, **never
reported as a commit** (otherwise *"one commit per gesture"* becomes unfalsifiable).

### §1.5 The listener surface (registration by reference, firing on change, and the commit's event count)

**REGISTRATION.** `subscribe(name, fn) → unsubscribe` — **by exact reference**, on **one declared tier**
(the subscribe names which tier it observes: `subscribe('temp.drag.g1.placement', fn)`). **A
prefix/tier-wide subscription is admitted only as a bounded, explicitly-declared form** — because a
listener on `temp.*` on the drag hot path is a re-render amplifier (`§8`), **and this plan requires
prefix subscriptions to carry a declared cap and to be refused when the cap is exceeded**.

**FIRING.** A listener fires on (a) a **set** that changes the reference's value, (b) a **commit** into the
reference, (c) a **clear** of the reference (with no value), (d) a **sweep** of the reference. **A set that
writes an equal value fires nothing** (value equality is `===` on the stored value — the store ships **no
comparator parameter**, matching the family's *"no `equals`/no comparator seam"* absence, `docs/specs/focus-model.md`'s
recorded `FocusEquality` absence, `[T]`-documented).

**THE COMMIT'S EVENT COUNT — ONE EVENT, NOT TWO, AND THE ORDER IS CLEAR-THEN-NOTIFY.** The architect's
example raises the question directly: *does a commit that (i) lands a value in the higher tier and (ii)
clears a lower one ping the listener once or twice?* **This plan's answer, and it is a RECOMMENDATION the
architect must confirm (`§9` Q-7), is ONE EVENT PER REFERENCE**:

```
event = { name: 'file.settings.pane.p7.size', tier: 'file', value: <the committed value>,
          committed: true, cleared: ['mem.layout.pane.p7.size', 'temp.drag.g1.placement'] }
```

**Four reasons, each checkable.** (1) **Two events on a hot reference is the re-render hazard this plan
names in `§8`** — a listener that re-renders twice per commit is a regression the drag path pays for.
(2) **Clear-then-notify ordering makes the lower tiers consistent for every listener's own re-read**: a
listener that calls `read(...)` inside the notification **must never observe the stale lower value**, and
with two events it would (the clear event could arrive first, the set second — or the reverse, and neither
order is safe for a listener that re-reads). (3) **The `cleared` array is the *receipt* the diagnostic
path needs** — it is how the wiring preserves layer 1 `L-5`/`ADV-GU-1`'s *"a refusal is a recorded
reading, never a silent no-op"* duty once the unbounded `writes` array dies (`§3` row 2.4-3). (4) **One
event keeps *"one commit per gesture"* countable** — the session's `commit` invocation count and the
store's `committed` event count **agree at 1**, which is exactly the agreement
`docs/decisions.md` `E10-SINGLE-SINK-CHANNEL`'s *"the two readings AGREE"* clause is built on (cited by
row name; the clause is quoted in `docs/FORKER.md` `§4`'s seam block, read this pass).

**⟶ ANSWERED 2026-10-01 (`Q-7`): ONE EVENT, CLEAR-THEN-NOTIFY, CARRYING `cleared[]` — AND IT IS NOW THE
DECISION, NOT A RECOMMENDATION.** **The paragraph above is the plan's answer and the architect has
CONFIRMED IT AS FILED:** one event per affected reference, emitted **after** the higher tier durably
accepted the write, carrying `cleared[]`; **the four reasons are unchanged and none is reopened.** **One
consequence is now a ROW rather than a nicety: the event's `cleared[]` array is the ONLY place a listener
learns what was removed (there is no second clear-event), so `cleared[]` is part of the event's contract
and a body that emits one event WITHOUT it is a contract failure.** **And the `§1.7` slice adds the one
case this rule did not have to cover as filed: `remove(name)` is a FIRST-CLASS operation (`§1.7` item 4)
and it fires the SAME one event shape with `cleared:[…]` and no committed value** — so `remove` and
`commit`-with-clears are **distinguishable by the event's own members** (`committed:true` + a value ·
`removed:true` + no value), **never by a count.**

**A LISTENER'S OWN DISCIPLINE, PINNED AS A RULE, BECAUSE THE ARCHITECT'S EXAMPLE ASSUMES IT.** A listener
**may read, may drive the consumer's presentation channel, and MAY NOT dispatch a graph mutation on the
hot path**. **The architect's sentence *"the zone render iterates the contained panes, and when it detects
that the dragged pane's location data is in the temp cache, it can automatically ghost the preview"* is
the one hop of their example that is IMPOSSIBLE in this repo as stated** — see `§4` hop 6 and `§5`
conflict 3.

---

### §1.6 The store-value questions the PARKING RULING re-opens (the zone-minimize line, absorbed)

**THE RULING, VERBATIM: *"Park it — the ownership model supersedes it."*** **What is parked is not the
question — it is the SEPARATE UNIT that carried it.** The parked unit (`docs/decisions.md`
`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE` clause 5's admitted-but-unfiled
family-side minimum-clamp unit, and the fork ask `ZONE-GESTURE-PREVIEW-AND-COLLAPSED-DROP-TARGET` behind it)
**stops being a unit and becomes four STORE-VALUE questions**, each answered here in the model's own
vocabulary: **which store it lands in · which reference names it · which listener fires · what the
recommendation is.** **The four questions are the parked record's own undefined semantics, quoted from
their own sites — nothing here re-derives the fork's ask.** **A reader must NOT take this subsection as
re-admitting the parked unit: it is the parked unit's SUBSTITUTION.**

| # | The undefined semantic (as the parked line left it) | Which store | Which reference (proposed) | Which listener fires, and what it drives | Recommendation (architect-reversible) |
| --- | --- | --- | --- | --- | --- |
| **ZQ-1** | **`refuse` vs TOTAL CLAMP** — does a below-minimum attempt REFUSE, or does the clamp totalize it? (the parked row's *"invalidate and refuse attempts to set a zone to less than a minimum"* against the family's total clamp) | **`temp` (the in-flight attempt) + `mem`/`file` (the received minimum)** | `temp.drag.<gestureId>.placement` · `mem.layout.zone.<zoneId>.min` · `file.settings.zone.<zoneId>.min` | the subscriber on the placement ref re-invokes the consumer's clamp+predicate chain; **no listener exists on the minimum ref beyond the boot/commit hydration** | **THE STORE REFUSES NAMES AND TIERS; IT NEVER REFUSES SIZES.** `refuse` is the store's verb for a malformed name, an unknown tier, a `secure.*` reference, or a cap overflow (`§1.3` R-4, C-3) — **never for a size**. The size outcome stays a **total** consumer computation whose pure clamp is the family's (`clampToBounds`). **Reason: a store that refuses sizes becomes a second clamp authority** — `S-PURE-4`'s one-clamp-site rule |
| **ZQ-2** | **THE MIN-vs-ZERO DISCRIMINATOR** — how a reader tells *"clamped to the minimum"* from *"zero ⇒ minimized"* | **`mem`** (the consumer's display decision) — mirrored to `file` only if it must survive a restart | **`mem.layout.zone.<zoneId>.display`**, whose **VALUE is the consumer's own opaque token** | the subscriber on that ref re-invokes the consumer's `revealed` predicate and the consumer's token emission | **THE DISCRIMINATOR IS A CALLER-OWNED OPAQUE VALUE, NEVER A STORE-SHIPPED WORD.** The store may not contain `'minimized'`/`is-minimized`/`'revealed'` (`§1.3` R-1; `P-CT-1`'s banned mirror-class taxonomy, `H-r15`'s hazard). **So `0` and `minimum` are distinguished by the consumer's own token in an opaque slot — and by NOTHING in the store's grammar.** **A store that spelled `is-minimized` in a reference would resurrect `SCH-10` under a new name and FAIL `P-CT-1`** |
| **ZQ-3** | **THE LAYER OWNING `0 ⇒ minimized`** — the parked row leaves it consumer-side by derivation | **`mem`, as a CARRIER only** | the same `mem.layout.zone.<zoneId>.display` plus the consumer's `census` reference input | the subscriber re-invokes the consumer's `revealed` predicate; **the mapping itself lives in no store and no mechanism** | **UNCHANGED OWNERSHIP, NOW WITH A NAMED CARRIER.** The mapping stays the consumer's `census` + `revealed` (`docs/specs/foundation-app-data-model.md` `§6.2`'s derivation, read in full; `docs/specs/census.md` `§0` ruling 5 / `§2.4` `C-C`: *"a CONSUMER DECISION, NEVER A DEFAULT"*). **The model's only contribution is that the predicate's INPUT now has a home and a change event** — so the wiring no longer has to re-read it by hand |
| **ZQ-4** | **THE REFERENT OF *"broadcast a location"*** — the parked ask's *"the minimized zone should still broadcast a location for the proximity detection to expand back to its configured size and host the pane"* | **`mem`** (the location's working form) — `file` only if a location must outlive a restart | **`mem.layout.zone.<zoneId>.slot`** (the caller's **opaque** slot key) and **`mem.layout.zone.<zoneId>.distance`** (the caller's **measured** scalar) | the subscriber on the slot/distance refs re-invokes the consumer's candidate-set builder; the ghost rides the **per-move** channel and the reveal the **terminal** one | **A "LOCATION" IS TWO CALLER VALUES — AN OPAQUE SLOT KEY AND A CALLER-MEASURED DISTANCE — NEVER A COORDINATE.** `docs/specs/container.md` `§3.4` `R-6` (*"no ELEMENT parameter anywhere in the module's surface"*), `§3.3` `I-6` (*"NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER"*), `docs/specs/zones.md` `§2.3` item 7 / `§3.3` `I-10`, and `S-d11`'s mandatory clause all bite: **the family produces no cell, no slot and no rect** (`docs/FORKER.md` `§4` block (iv), read this pass). The comparator stays `withinProximity` (two scalars); the expansion rides the **once-per-gesture terminal** and the ghost the **per-move** channel (`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`, `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`) |

**⟶ ANSWERED 2026-10-01 (`Q-12`): THE PARK IS CONFIRMED AND `ZQ-1`…`ZQ-4` ARE THE ANSWERS.** **The
architect's ruling stands as filed — the separate unit does not become a unit, and the four undefined
semantics are answered above in the model's own vocabulary.** **Three consequences are now DECISIONS
rather than recommendations, and each is a row a unit can FAIL:** **(a) THE STORE REFUSES NAMES AND
TIERS, NEVER SIZES** (`ZQ-1`) — so **no store-side clamp exists** and `clampToBounds` stays the family's
one clamp site (`S-PURE-4`); **(b) THE MIN-vs-ZERO DISCRIMINATOR IS A CALLER-OWNED OPAQUE VALUE**
(`ZQ-2`) — and **a store whose bytes spell `is-minimized`/`is-revealed`/`minimized` FAILS `P-CT-1`**
(the `H-r15` hazard, now a scan row over the store's own source); **(c) A "LOCATION" IS AN OPAQUE SLOT
KEY PLUS A CALLER-MEASURED DISTANCE, NEVER A COORDINATE** (`ZQ-4`) — so `FAM-5`/`R-5` bind the store's
values and the ONE coordinate read stays in the affordance's own move turn (`[U]`). **The parking's own
status word is unchanged: parked, absorbed, and no unit admitted** (`§7.4.1`, `§9.1` `Q-12`).

**WHAT THE ABSORPTION COSTS, STATED SO THE PARKING IS NOT READ AS A SAVING.** Four semantics that would
have been **one unit's open list** are now **four rows spread across `U-STORE-CORE` (ZQ-1's refusal
surface), `U-STORE-LAYOUT` (ZQ-2/ZQ-3/ZQ-4) and `U-STORE-DRAG` (ZQ-1's in-flight attempt)** — so **the
parked unit's questions are not smaller; they are RE-HOMED, and they are now gated by units that also carry
other work.** **And one honest consequence: `U-STORE-LAYOUT` NO LONGER DEPENDS on the unfiled family-side
clamp unit** (`§6` is updated) — because the clamp's family-side half has no separate unit left to wait
for. **The clamp itself is unchanged: `clampToBounds` stays the family's one pure clamp.**

---

### §1.7 The TABS/FOCUS SLICE — the model's FIRST TENANT, stated in the model's own vocabulary

**STATUS OF THIS SUBSECTION, STATED FIRST SO NOTHING IS OVER-READ.** It is **NEW 2026-10-01, adopted
whole from the architect**; it is **the first worked tenant of the model** (the drag example of `§4` is
the second), and **it is the thing that answers `Q-9`** — the renderer's focus holder **stops being the
authority**. **It is a PLAN, not a contract:** every reference below is **PROPOSED**, every table is the
plan's, and **no unit carries it yet** (`§6.5`). **Layer labels carry as everywhere in this document.**

| # | The clause | What it pins, and what a unit can FAIL on |
| --- | --- | --- |
| **1** | **`tabs` IS A TOP-LEVEL STORE OBJECT, OWNED BY TIER 1 (`file`)** | The tab list — its entries, their order, their per-tab properties — is **tier-1 data** and therefore **survives a restart**. **Proposed references: `file.tabs.order` (the caller's ordered id sequence) · `file.tabs.<tabId>.target` · `file.tabs.<tabId>.active` · `file.tabs.<tabId>.error` · `file.tabs.<tabId>.label`.** **A unit FAILS this clause if the tab list is held in a renderer module binding instead of the store** (that is `RH-4`'s shape, `§7.1`), or if the list is split across tiers with no declared alias. **The list IS MCP-visible only through a graph node** (`§2.3` `P-E2`): the store is the persistence and the working copy, **the graph stays the authority** for anything an agent reads back. |
| **2** | **THE ACTIVE TAB IS A PER-TAB PROPERTY `active=true`, UNDER A FIRST-CLASS CONSTRAINT** | **THE CONSTRAINT, stated so it is falsifiable: EXACTLY ONE TAB CARRIES `active=true` WHILE ANY TABS EXIST.** It is **not** a separate `activeId` pointer beside the list and **not** a store-shipped enum — it is **a caller-boolean per tab under a constraint the STORE evaluates on every write** (item 3). **A unit FAILS if the active tab is inferred from order, from a token the store ships (`is-active`), or from a second holder** (the `V-13`/`A-19` one-authority class). |
| **3** | **CONSTRAINTS ARE A FIRST-CLASS MODEL ELEMENT** | **A constraint is DECLARED PER REFERENCE, EVALUATED ON EVERY WRITE, AND IT HAS A STATED OUTCOME.** **THE DECLARED OUTCOME FOR THIS MODEL'S FIRST CONSTRAINT IS `REPAIR` — NOT `REFUSE`.** The worked case: a write that would leave **zero** or **two-or-more** tabs carrying `active=true` is **REPAIRED in the same write**, and **the repair is part of the write's receipt** (`{status:'committed', repaired:[…]}`). **WHY REPAIR AND NOT REFUSE:** the store's refusal vocabulary is **names/tiers/caps** (`§1.6` `ZQ-1`, `§1.3` `R-6`/`R-7`); a constraint **about the SHAPE OF A COHERENT STATE** is a different thing, and refusing it would make a legal operator action (closing the active tab) **impossible** — the repair is what keeps exactly-one-active **unconditional**. **A unit FAILS if a constraint is implemented as a caller convention** (`the caller promises not to…`), if a violating write lands **without** a repair, or if a repair is **silent** (unreported in the receipt). **THE REPAIR ARM'S OWN FAILURE MODES ARE `§7.3` `NW-8`** — the store has no policy to choose *which* tab wins beyond the declared rule below, so the rule **must be declared, not chosen at write time**. |
| **4** | **THE TAB LIST IS UNBOUNDED BUT PRUNABLE; REMOVAL IS THE CLOSE VERB, AND `remove(name)` IS A FIRST-CLASS STORE OPERATION** | **TABS ARE REMOVED ONLY BY THE CLOSE VERB, AND THE CLOSE REMOVES THE TAB FROM THE FILE STORE — a PERSISTED removal, not an in-memory one.** **Therefore `remove(name)` is a first-class store operation with four obligations: (a) delete at the OWNING tier; (b) persist the removal (through the tier-1 channel, `§2.5`); (c) notify ONCE, by `§1.5`'s one-event rule, with `cleared:[…]` and no committed value; (d) clear the reference's DECLARED lower aliases (rule C-4).** **AND THE TWO NEGATIVES, STATED SO A UNIT CAN FAIL ON THEM: `set(name, undefined)` IS NOT A DELETION** — an `undefined` value is **a value** (the tier-2/`focus-model` reading of `undefined` is already pinned as *legal and distinct from `null`*, `docs/specs/focus-model.md` `§2.3` item 5 row 4's dated extension) — **and it is NOT a third state**: there is **no `removed` state in the store's grammar**, only `found:true` with a value, or `found:false`. **A unit FAILS if a removal is an in-memory splice with no persisted effect, if a read after the removal still hits a stale lower tier, or if a "removed" third state appears.** |
| **5** | **CLOSING THE ACTIVE TAB REPAIRS; CLOSING THE LAST TAB OPENS THE LANDING PAGE AS A TAB** | **THE TWO TERMINALS, both in the same write:** **(a) closing the active tab while others survive → the NEXT SURVIVING TAB, BY ORDER, IS ACTIVATED IN THE SAME WRITE** (the repair arm of item 3, with the order rule declared: *the caller's own `file.tabs.order`*, never the store's choice); **(b) closing the LAST tab → THE LANDING PAGE OPENS AS A TAB.** **THE LANDING PAGE IS A RESERVED REFERENCE IN THE REGISTRY (`§1.3` `R-7`) AND IT CANNOT BE REMOVABLY EMPTY** — which is precisely what makes **exactly-one-active UNCONDITIONAL**: there is never a state with zero tabs, so there is never a state in which the constraint is vacuous. **A unit FAILS if closing the last tab leaves an empty list, if the landing tab is an in-memory fiction that does not survive a restart, or if the landing reference can be removed.** **The landing page itself is an AUTHORED SURFACE (item 6), and its own `§5.U` live row is owed** (`§7.3` `NW-9`). |
| **6** | **THE ERROR PAGE AND THE LANDING PAGE ARE PROVIDENT-AUTHORED SURFACES** | Both are **envelope-authored nodes plus BOUNDED WIRING ROLES** — this repo's binding rule: **every non-shell UI element is provident-rendered DATA (`AGENTS.md`'s project-wide constraint; `docs/specs/mcp-endpoint.md` `P-E2`), never hand-written DOM.** So the two pages **owe authored nodes, a bounded wiring role each, and a `§5.U` live row each** (`docs/specs/user-flow-audit.md` `§7.1` — a rendered surface whose truth is real-DOM-only). **A unit FAILS if either page is built by `createElement` in the wiring, or if a live row for it is parked for a non-structural reason** (a merely-parked UI row is `OPEN`, never green — gate 6's own rule). |
| **7** | **FOCUSING A TARGET VERIFIES RENDERABILITY FIRST, THROUGH A HOST-SIDE QUERY** | **The runtime ALREADY resolves nodes** — `src/renderer/runtime.ts` `elementForNodeId(id) → unknown \| null` (`[H]`, read this pass: *"TOTAL: an unresolvable id, a mount that is not a node and a child list that is not array-like all answer `null`"*) — so **the renderability query is a HOST-SIDE call against the ALREADY-LANDED surface**: **no pure-module change, no new seam, and NO COORDINATE OR GEOMETRY READ** (`R-5`, `E5-B-2`, `S-d11`: *"the geometry the family produces is UNPROVABLE in this repo today"* — a renderability *verdict* is not a geometry *claim*). **AN UNRENDERABLE TARGET OPENS THE TAB SHOWING AN ERROR PAGE** (item 6) rather than refusing, and the tab carries its own error property (`file.tabs.<tabId>.error`). **A unit FAILS if the query reads a rect, a coordinate or a computed style, or if the resolution is re-derived by a selector.** |
| **8** | **`unknown-id` BECOMES UNREACHABLE FROM THE FOCUS VERB** | **An unknown OR UNRENDERABLE target now OPENS AN ERROR TAB** rather than returning the consumer's `refused:{reason:'unknown-id'}` record, so **the refusal path the tool's own rows pin (`docs/specs/focus-tool.md` `§2.2`(C) `S-4`; `§3.2 F-3`; the live record `docs/specs/focus-tool-greens.md` `FT-09`, which measures `refused={"reason":"unknown-id"}`) IS AMENDED — and the amendment is ROUTED, NOT PERFORMED HERE** (`§6.5` stop-and-ask 8): the two sites are **`docs/specs/mcp-endpoint.md` §3.8** and **`docs/specs/focus-tool.md`'s refusal rows**, and **each owes its own gate.** |
| **9** | **THE REFUSAL UNION STAYS FUNCTION-INTERNAL — SO NO `focus-model` REGISTER RE-GRAIN IS OWED** | **This is stated explicitly because it was the earlier objection and it is answered in the negative:** the refusal union (`FocusRefusalCode`'s five members — `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` · `'no-previous'`, `docs/specs/focus-model.md` `§2.1` item 11 / `§2.2`(D) / `R-8`) is **the module's OWN, it is NEVER PASSED TO THE STORE, and the store ships no refusal code of its own.** The store's refusals are **its own vocabulary** (unknown name · wrong tier segment · reserved name · cap overflow — `§1.8`), and **the two vocabularies do not meet**: the tab slice **calls** the pure module and **handles** its record; it does not re-spell it. **Therefore the module's register (`§5.5.1`, `13` typed rows / `98` declared) is NOT re-grained and NO new refusal code is minted** — **the earlier objection's own premise (that the slice would add a refusal code to the union) is FALSE.** **A unit that adds a member to `FocusRefusalCode`, or that hands a store refusal into the module's `refuse` seam as a code, FAILS this clause.** |
| **10** | **THE TAB SLICE'S OWN HARD DESIGN ROW — THE KERNELS' AMBIENT-READ RISK (`NW-4`) IS NOW A CONSTRAINT, NOT A FOOTNOTE** | **Because ALL FIFTEEN shared modules adopt the paradigm (`§5.2.6`, `Q-13`), the five pure kernels gain an edge — and a kernel whose answer depends on a store read is a kernel whose answer depends on STATE.** **THE ROW, stated as a constraint the slice must carry: a store-sourced value may reach a pure kernel ONLY where the landed rows place the DECISION with the caller; it may NEVER be the source of the emptiness/token/reveal/min-max/gesture-lifecycle/element-id decision.** **Concretely for this slice: `zones.ts`/`census.ts` read their store values as ARGUMENTS the caller passes (the paradigm lands in the consumer's closures), and the store read NEVER replaces the caller's `revealed`/`sizes` predicate inputs.** **A unit that grants a pure kernel a store edge for a consumer decision is a FINDING, not a design choice** (`§7.4.2`, unchanged and now load-bearing). |

**THE SLICE'S REFERENCES, IN ONE TABLE, ALL PROPOSED AND ALL TIER-LABELLED.**

| Reference (proposed) | Tier | What it holds | Its constraint / reserved status |
| --- | --- | --- | --- |
| `file.tabs.order` | `file` | the caller's ordered tab-id sequence — **the repair arm's order rule reads THIS** | none (declared) |
| `file.tabs.<tabId>.target` | `file` | the caller's opaque target (the focus verb's own argument) | none |
| `file.tabs.<tabId>.active` | `file` | the caller's boolean — **the model's first constraint's subject** | **EXACTLY ONE `true` WHILE ANY TABS EXIST — evaluated on every write, outcome `REPAIR`** |
| `file.tabs.<tabId>.error` | `file` | the caller's own error token, present exactly when the renderability query answered `null` | none (and **the store ships no error vocabulary**) |
| `file.tabs.<tabId>.label` | `file` | the caller's own label (opaque) | none |
| `file.tabs.landing` | `file` | **the RESERVED reference** — the landing page's tab entry | **RESERVED (`§1.3` `R-7`): `remove()` on it is REFUSED by name, so exactly-one-active is unconditional** |
| `mem.focus.*` | `mem` | **any residual renderer-realm working copy of the focus state — and note that under this slice the AUTHORITY has moved to `file.tabs.*`** | none; **`§3.4` row 2.4-1's move of the holder into tier 2 is now subordinate to this slice** (`§7.1` `RH-4`) |

**WHAT THE SLICE COSTS, STATED IN THE PLACES IT COSTS.** **(i) TWO AUTHORED SURFACES AND TWO LIVE ROWS**
(item 6) — the landing and error pages are **rendered UIs**, so gate 6's mandatory live battery applies
in addition to the node suite (`RCA-12`: a `[T]`/`[H]` green is never an APP green). **(ii) A PERSISTED
LIST THAT GROWS ACROSS RESTARTS** — the list is unbounded but prunable, and **pruning is the operator's
action, not the store's** (`§7.3` `NW-7`; `§9.1` `OPEN-1`). **(iii) THE REPAIR ARM'S OWN FAILURE MODES**
(`§7.3` `NW-8`). **(iv) A SECOND CONTRACT SURFACE** — the registry (`§1.8`), which is the slice's
prerequisite. **(v) TWO ROUTED AMENDMENTS** (`§1.7` item 8) — **not performed by this pass.**

---

### §1.8 THE DECLARED NAME REGISTRY (`Q-6`, ANSWERED 2026-10-01) — the store's SECOND CONTRACT SURFACE

**WHY IT IS A SURFACE AND NOT A TABLE.** `§1.3` `R-2`/`R-3` made *one spelling, one home* a
**convention**; `R-6` makes it **a refused write**, and **a registry that refuses writes is a contract,
not a lookup**: it has a **declared shape**, **its own failure modes**, and **its own positive controls**
(a legal name succeeds; a declared-twice name does not). **This subsection is therefore the second
contract surface beside the read/commit/event surface of `§1.2`/`§1.4`/`§1.5`.**

**THE DECLARATION ROW, EXACT (the shape a unit's register row drives).** One row per declared reference:

```
{ name: 'file.tabs.<tabId>.active',
  tier: 'file',                       // must match the name's OWN first segment
  lowerAliases: ['mem.tabs.<tabId>.active'],   // the DECLARED clears (rule C-4); [] is legal and clears nothing
  reserved: false,                     // true => remove() is refused BY NAME (`R-7`)
  constraint: 'exactly-one-active'     // an id into the declared constraint table, or null
}
```

**THE REGISTRY'S FAILURE-MODE TABLE — every row a write-time refusal or a declared acceptance, each
drivable with a positive control.**

| # | The input | Outcome | The positive control that must PASS beside it |
| --- | --- | --- | --- |
| **G-1** | **a name NOT DECLARED in the registry** (`mem.whatever.thing`) | **REFUSED** (`{status:'refused', reason:'undeclared-name'}`) — **at WRITE time**, never a silent miss, and **never an implicit declaration** | the same call with a declared name **COMMITS** |
| **G-2** | **a name DECLARED TWICE** (one row per declaration, two rows with the same `name`) | **the DECLARATION ITSELF is refused** — the registry is **a set**, and a duplicate is **the `F-8` class made mechanical** (two spellings of one home) | a registry with each name once **loads** |
| **G-3** | **a name whose FIRST SEGMENT does not match its declared `tier`** (`tier:'mem'` on a `file.…` name) | **REFUSED** — the tier segment is **structural**, and **a name whose tier disagrees with its row is the one place the store could silently write to the wrong tier** | a matching pair **COMMITS to the declared tier, and only that tier** |
| **G-4** | **`remove()` on a RESERVED name** (`file.tabs.landing`) | **REFUSED BY NAME** (`reason:'reserved-name'`) — the model's own invariant needs it (`§1.7` item 5) | `remove()` on a declared NON-reserved name **removes and persists** |
| **G-5** | **a name with a tier segment OUTSIDE the four tokens** (`disk.…`, `File.…`) | **REFUSED** — the grammar's tier domain is closed (`§1.3`'s grammar; **case-sensitive**, so `File.` is not `file.`) | each of the four legal tier tokens **loads** |
| **G-6** | **a `secure.*` name** | **REFUSED by the generic surface** (`§1.3` `R-4`, `§3.8`) — **and this refusal is INDEPENDENT of the registry** (a `secure.*` name that IS declared in the tier's own table is still refused by `read`/`commit`/`subscribe`/`clear`/`remove`) | the tier's **OWN** `get`/`set` on the same name **works** (the refusal is by NAME-and-SURFACE, not a blanket denial) |
| **G-7** | **an empty or non-string name**, or a name with an empty segment (`file..x`) | **REFUSED** (`reason:'malformed-name'`) — **never a throw** | a one-segment path after the tier (`file.x`) **is legal** |
| **G-8** | **a declared name whose `lowerAliases` entry is ITSELF undeclared, or is declared in a HIGHER-or-equal tier** | **the DECLARATION is refused** — an alias pointing up or sideways is a **second authority** and would break C-1's *"a commit never clears a higher tier"* | a downward alias **clears exactly that alias and nothing else** (C-4's declaration-not-inference rule) |

**AND THE REGISTRY'S OWN NEGATIVES, SO ITS `R-1` DISCIPLINE IS ENFORCED RATHER THAN ASSUMED.** **The
registry's bytes carry NO consumer vocabulary:** no `tab`/`pane`/`zone`/`region` token **as the store's
own vocabulary**, no `is-active`/`is-empty`/`is-minimized`/`is-revealed` literal, no unit string — **the
declarations are the CALLER'S spellings carried verbatim** (`R-1`), and **the scan row is the same
`container.md` `§3.4` `R-1` pattern with a positive control** (`§5.9` rows 11/12). **The `§1.7` slice's
own references (`file.tabs.…`) are the CALLER'S names, and the store treats `tabs`/`active` exactly as it
treats `leftSidebar`/`width` in the architect's own example — as opaque segments it never interprets.**
**A registry that shipped `is-active` as a store-known key would be the `SCH-10`-under-a-new-name hazard
`H-r15` names, and it FAILS.**

---

## §2. The process/realm split

### §2.1 Where each store physically lives — decided, and justified

| Store | Realm | Why (the anchor) |
| --- | --- | --- |
| **`file` (tier 1)** | **⟶ REVISED 2026-10-01 (`Q-1`, ANSWERED) — READ `§2.5`; THE LIVE ROW IS: THE RENDERER OWNS THE VALUES, `main` OWNS THE FILE AND THE CHANNEL. THE AS-FILED CELL BELOW (*"`main` OWNS the file; the renderer holds a READ-THROUGH MIRROR"*) IS KEPT VISIBLE AND IS SUPERSEDED, BECAUSE THE MIRROR NO LONGER EXISTS.** | **The file needs `node:fs`, which is `main`'s alone** — `src/renderer/index.html`'s page runs with `contextIsolation: true` / `nodeIntegration: false` (`src/main/main.ts` `new BrowserWindow`, read this pass `:158-166`, `[H]`), and `docs/specs/mcp-endpoint.md` `§4.1`'s *"WHAT IS DELIBERATELY NOT BRIDGED"* records that **no Node object, no `fs`, no `require`, no `process` crosses**. **The mirror exists because the architect's own read shape (`cache` = a live object reference, `§1.2`) is only faithfully implementable in one realm**, and because a hot path must not pay an IPC round trip per read. **The mirror is hydrated ONCE at boot and updated ONLY by the store's own commit receipts** — so it is a **read cache of tier 1, never a second authority** (and the second-holder hazard is named in `§7`). **⟶ AND THE REVISION GENERALISES THE PARAGRAPH ABOVE RATHER THAN REFUTING IT: the clause the architect's read shape forces is *"faithful in ONE realm"*, and `Q-1`'s answer takes it to its end — the renderer holds the values THEMSELVES (`main`'s role is the file, the atomic write and the `Y-1`/`Y-2` channel), so the "mirror" becomes an AUTHORITY and the second-holder hazard disappears (`§7.3` `NW-1` deleted).** |
| **`mem` (tier 2)** | **renderer realm** | It carries the **focus holder** (already a renderer module-level binding, layer 1 `§2.4` row 1, `[H]`) and the **working layout record** (the values the *wiring* passes into the family's seams, layer 1 `§3`'s layout row). **Both are already renderer-realm by construction**; moving them to `main` would put an IPC round trip on the pane-hover and focus paths and would create a *second* copy of the focus holder — i.e. the dual-authority class, not a centralization. |
| **`temp` (tier 3)** | **renderer realm** | It is the **hot path's tier**: the drag's per-move value originates at a pointer on a renderer element (`src/renderer/renderer.ts` `applyPreview`, `[H]`) and is observed by a renderer listener. **A main-side temp tier would make every observed move an async IPC round trip** — the drag would become a network-shaped operation inside one process. |
| **`secure` (tier 4)** | **`main` ONLY** | It is where it already is (`src/main/security-store.ts`, `[H]`), and `docs/specs/mcp-endpoint.md` `§6.4`'s *"main owns the config"* + layer 1 `§5` `A-7` make it so **by construction**: **the token never crosses to the renderer except as the operator pane's own snapshot**, and the pane lives in an **isolated graph** the MCP endpoints cannot read (`src/renderer/secure-panels.ts`, layer 1 `§2.4` rows 10–14). |

### §2.2 What must cross an IPC boundary for the layered read to work from the renderer — and its cost

**WHAT CROSSES, IN THREE SHAPES, AND NOTHING ELSE. ⟶ SUPERSEDED BESIDE 2026-10-01 (`Q-1`, ANSWERED): THE THREE CROSSINGS BELOW ARE THE AS-FILED `X-1`/`X-2`/`X-3` AND THEIR DIRECTIONS ARE INVERTED BY `§2.5`'s `Y-1`/`Y-2`/`Y-3` (the boot hand-off and the commit channel are now renderer→main with a receipt back, and only the third crossing keeps its direction). THE SHAPES AND THE PER-CROSSING COSTS BELOW STAND AND ARE RE-USED; THE RANK OF WHO HOLDS THE VALUE DOES NOT.**

| # | Direction | Shape | When | Cost per crossing |
| --- | --- | --- | --- | --- |
| **X-1 — the hydration read** | renderer → main → renderer | **a VALUE**: one request for the names the renderer needs, answered with `{name, value}[]` (JSON-safe — `P-E6`) | **once per realm, at boot** | **one `invoke` round trip** (`ipcRenderer.invoke` ↔ `ipcMain.handle`, the landed shape of the security/module channels, `docs/specs/mcp-endpoint.md` `§4.1`'s two `invoke` rows) |
| **X-2 — the commit** | renderer → main → renderer | **a VALUE in, a RECEIPT out**: `{name, value}` in; `{status:'committed'|'refused', name, cleared[]}` out | **once per commit** (in the drag case: **once per gesture**) | **one `invoke` round trip per commit** — and **NOT per read and NOT per move** |
| **X-3 — the change push (main→renderer)** | main → renderer | **a signal + a value** for any tier-1 change the renderer did not itself cause (an operator-file change, a second window) | on a main-side write | one `webContents.send`; **on today's single-window app this is a declared NO-OP path** (no second writer exists) — so it is **specified but untested by construction**, and a later multi-window app owns its rows |

**THE COST OF A READ IS ZERO CROSSINGS.** `read(name)` is a **synchronous, in-realm** function over three
in-realm tiers (two of them the renderer's own; the third its mirror). **This is the design's central
performance claim and it is what makes the architect's drag example implementable at all** (`§8` sizes it).

**WHAT THIS SPLIT COSTS, STATED HONESTLY (the rows a review can FAIL).**
1. **The tier-1 mirror is a SECOND HOLDER of tier-1 state** — the `F-6`-class shape, in a new place. It is
   admissible only because it is **read-through and single-writer** (C-3's receipt path), and it must carry
   a **staleness row**: *a value written to the file by anything other than the store's own commit is
   invisible to the renderer until re-hydration.*
2. **A commit is asynchronous** (an `invoke`), so **`commit` is not usable from a synchronous turn** — the
   drag's release is a turn where async completion is fine (the gesture has already terminated), but a
   would-be synchronous commit site does not exist. **Any design that needs a synchronous commit is
   outside this model.**
3. **The receipt is the only refusal channel** — the renderer learns of a failed persist **only** through
   X-2's answer, so **a fire-and-forget commit loses the refusal** (the very `L-5`/`ADV-GU-1` failure
   mode). **A commit site that discards its receipt is a FINDING.**

### §2.3 The parity consequence — what becomes MCP-visible, and what must stay invisible

**THE RULE, AND IT IS THE LANDED ONE, NOT A NEW ONE: A STORE VALUE IS MCP-VISIBLE IF AND ONLY IF A GRAPH
NODE CARRIES IT.** `docs/specs/mcp-endpoint.md` `P-E2` (*"Graph-canon, fragment-is-a-view: dispatch mutates
the graph; the returned HTML is freshly re-emitted. Never 'the HTML reacts'"*, read this pass) and layer 1
`§3`'s *"the authored UI (what the app shows) — the envelope"* row. **Therefore:**

- **A store is NEVER a new MCP surface.** The model adds **no tool, no resource, no tool-group,
  no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry and no IPC method beyond
  X-1/X-2/X-3** — the five-seam sweep the family units already assert **by set equality against the names**
  (`docs/specs/zones.md` `§3.4` `R-6`'s five-seam negative and its `A-11` sweep row, read at that section).
  **A new tool that reads a store is a new contract with its own gate** — and for `secure.*` it is
  **forbidden outright** (`§6.4`, `A-7`).
- **`temp` and `mem` are invisible unless mirrored.** The drag's in-flight value is **not** MCP-visible by
  construction — which is the *correct* outcome: `docs/specs/gutter-ui.md` `§2.5` item 6 pins that the
  preview *"is not a commit, not the authored state, not MCP-visible, not persistent, and not a claim about
  the layout"* (read this pass). **The committed value stays the graph's, and it is the graph's content
  that `get_rendered_html`/`get_markdown` read back.** **So the drag's two MCP-visible observations remain
  exactly what they are today**: the authored `gutter-status` node's `content` and the rendered markup.
- **`secure` must stay invisible, above all.** Nothing in this model may make the token, the enabled group
  set, or `maxJournalLength` reachable through `ALL_TOOLS`/`ALL_RESOURCES` (`src/main/mcp-server.ts`), and
  the generic read's `secure.*` refusal (`§1.3` R-4) is the mechanism that keeps that true **even for code
  inside the renderer realm**.
- **The parity rule between transports is untouched**: `P-E3` (*"stdio and HTTP expose identical tools"*)
  is satisfied trivially because the model adds no tool on either — and **the store must not be reachable
  on one transport only.**

### §2.4 The IPC channel home — a fork-pin decision, named here because it is easy to get wrong

**THE PROBLEM.** `secure`'s channels already have constants in **`src/shared/types.ts`**
(`IPC_SECURITY_GET`/`IPC_SECURITY_SET`/`IPC_MODULE_GET`/`IPC_MODULE_SET_DISABLED`, read this pass `:325-328`,
`[H]`). **`src/shared/types.ts` is a VENDORED module**: it is one of the 19 (layer 1 `§2.6`), it is in
**both** bundles, and it is imported by `src/main/main.ts`, `preload.ts`, `mcp-server.ts`,
`security-store.ts`, `src/renderer/renderer.ts`, `runtime.ts`, `secure-panels.ts`. **So adding the store's
channel constants there MOVES A VENDORED MODULE'S BYTES** and owes the fork a re-vendor (`§5` conflict 6).

**THE OPTIONS (`§9` Q-3 carries the recommendation).** **(a) put the store's channel constants in a NEW
host-side file** (**proposed `src/main/store-channels.ts`**) **and import them from `src/main/main.ts` and
`src/main/preload.ts`** — `src/shared/types.ts` stays byte-identical, the renderer reaches the channel
**through the preload's exposed function** (it never needs the constant), and the cost is that **the
channel-name agreement becomes a host-side single-source claim needing its own row** (the `F-8` lesson,
applied). **(b) add the constants to `src/shared/types.ts`** — the tidiest by convention, the most
expensive by fork pin. **(c) reuse an existing channel family** — **refused**: the app-graph invoke/reply
pair is **main-initiated** (layer 1 `§4.1`'s structural fact: *"there is no IPC path from the renderer to
the app graph's data other than the invoke/reply pair — and that pair is main-initiated (the renderer only
ever answers)"*), so it cannot carry a renderer-originated commit; and multiplexing a store commit onto the
security channel would **make the store's data reachable through a manual-UI-only channel's name**, which
is a `§6.4` hazard, not a saving.

---

### §2.5 THE REVISED PROCESS/REALM SPLIT (`Q-1`, ANSWERED 2026-10-01) — **THE AS-FILED MIRROR IS WITHDRAWN AND THE CROSSINGS INVERT**

**WHAT CHANGED, IN ONE SENTENCE.** **The draft put `file`'s AUTHORITY in `main` and gave the renderer a
read-through MIRROR of it; the architect's answer puts `file`'s VALUES in the RENDERER and gives `main`
the FILE-OWNING CHANNEL that persists them.** **So the as-filed `§2.1` `file` row's *"read-through
mirror"* and the as-filed `§2.2` `X-1`/`X-2`/`X-3` crossing table are SUPERSEDED BESIDE, not rewritten
(`RCA-8(d)`): this subsection is the live split, and the cells they replace are annotated in place.** **A
reader must take the four cells with the dated `⟶ REVISED` markers as historical.**

**THE REVISED REALM TABLE — four tiers, three of them the renderer's, one the main process's.**

| Store | Realm (REVISED) | Why, and what moved |
| --- | --- | --- |
| **`file` (tier 1)** | **THE RENDERER OWNS THE VALUES; `main` OWNS THE FILE AND THE CHANNEL** | **The values must be readable synchronously on hot paths** (a pane hover, a layout read, the drag's pre-drag size) — the architect's own `cache` reference cannot cross a boundary (`§1.2`, `P-E6`), so **the values must live where the read happens.** **`main` remains the only writer of the file's BYTES** because only `main` has `node:fs` (`contextIsolation: true`, `nodeIntegration: false`; `docs/specs/mcp-endpoint.md` `§4.1`'s *"no Node object, no `fs`, no `require`, no `process`"*). **So the split is ROLE-based, not value-based: the renderer decides, `main` persists.** |
| **`mem` (tier 2)** | **the renderer realm** (unchanged) | As filed: the focus holder (now subordinate to `§1.7`'s tabs slice — **the authority moved to tier 1**), the working layout record, the bounded last-commit diagnostic. |
| **`temp` (tier 3)** | **the renderer realm** (unchanged) | As filed: the hot path's tier; **a main-side temp tier would make every observed move an async IPC round trip.** |
| **`secure` (tier 4)** | **`main` ONLY** (unchanged, and unchanged by this revision) | As filed, and **the revised split makes tier 0's isolation stronger rather than weaker**: with `main` no longer holding tier 1's values, **the main process's only data authority is the security tier** — `docs/specs/mcp-endpoint.md` `§6.4`'s manual-UI-only property and layer 1 `§5` `A-7` stand. |

**THE CROSSINGS, INVERTED AND RENAMED (`Y-*`, so no reader conflates them with the withdrawn `X-*`).**

| # | Direction (REVISED) | Shape | When | Cost per crossing |
| --- | --- | --- | --- | --- |
| **Y-1 — THE BOOT HAND-OFF** | **renderer → main → renderer**: the renderer asks for the persisted values and **receives them once**, then **OWNS them** | **a VALUE**: `{name, value}[]` (JSON-safe, `P-E6`) | **once per realm, at boot**, and **BEFORE the first graph load** (see the BOOT ORDER below) | **one `invoke` round trip** (`ipcRenderer.invoke` ↔ `ipcMain.handle`) — and **NOT per read** |
| **Y-2 — THE COMMIT CHANNEL** | **renderer → main → renderer**: a VALUE in, a RECEIPT out | `{name, value}` in; `{status:'committed'\|'refused'\|'repaired', name, cleared[], repaired[]}` out | **once per commit** (in the drag case: **once per gesture**); **once per `remove()`**; **once per tab close** | **one `invoke` round trip per write — NOT per read and NOT per move.** **The receipt is the ONLY refusal channel, so a commit site that discards it is a FINDING (`L-5`/`ADV-GU-1`).** |
| **Y-3 — THE CHANGE PUSH** | **main → renderer**: a signal + a value for any tier-1 change the renderer did not itself cause | a signal + a value | on a main-side write (an operator-file change, a second window) | one `webContents.send`; **a DECLARED NO-OP on today's single-window app** — specified, and **untested by construction**; a later multi-window app owns its rows |

**THE COST OF A READ IS STILL ZERO CROSSINGS — AND IT IS NOW STRICTLY BETTER THAN AS FILED.**
`read(name)` is a synchronous, in-realm function over **three tiers that are ALL the renderer's own** (as
filed it was *"two of them the renderer's own; the third its mirror"*, `§2.2` — **that sentence's own
figure is superseded: there is no third-party tier under the fall-through any more**). **No IPC, no
serialization, no allocation beyond the returned record.**

**THE ATOMIC DUTY LIVES BEHIND THE CHANNEL, AND IT IS NAMED.** Because the WRITER is `main`, **the
atomic write (`${path}.tmp` + `writeFileSync` + `renameSync`), the `fsync` before the rename, the
`mkdirSync(recursive)` and the corrupt-at-read-back recovery are the CHANNEL's obligations** — the landed
precedent is `src/main/module-store.ts` `persist()` (`F1 (adversarial)`'s crash-truncation comment,
`[H]`), and **`src/main/security-store.ts` `persist()`'s plain `writeFileSync` (read this pass, `[H]`) is
EXPLICITLY NAMED AS THE PATTERN THIS CHANNEL MUST NOT COPY.** **The renderer cannot touch a path, so the
non-atomic shape is what a renderer-side "persist" would produce by construction — which is the
architectural reason the duty belongs to the channel and not to the tier's caller.** **Four contract
rows: (a) atomic replace · (b) `fsync` before rename · (c) corrupt-at-read-back falls back to the
registered defaults, never a throw · (d) a failed persist returns a RECEIPT, never a swallow** (the
`F-6` swallow `§7.2` records stays a partial fix by construction — **its half that lives in tier 4 is
fixed by `U-STORE-SECURITY`, its tier-1 half by this channel**).

**THE BOOT ORDER CHANGES, AND THIS IS THE PART EASIEST TO GET WRONG.** **As filed, `main` read the file
and the renderer could hydrate at leisure** (`§2.2` `X-1`'s *"once per realm, at boot"*). **Under the
revision the renderer OWNS the values, so the order is forced:**

```
main: app ready → resolve userData → construct the SECURITY tier (tier 4, main-side, unchanged)
     → register the tier-1 CHANNEL handlers (read the file ONCE, validate, hold the parsed record)
     → construct the BrowserWindow → load the renderer page
renderer: page load → HOST-SIDE HAND-OFF (Y-1: request the persisted values ONCE)
        → build the three in-realm tiers from the handed-off record (they now OWN it)
        → [tabs slice: `file.tabs.*` + the reserved landing reference + the first constraint evaluation]
        → create the Runtime and load the FIRST envelope (the boot graph)
        → the gutter wiring attaches (its pre-drag read now hits an in-realm tier, NO crossing)
main: on any Y-2 commit → atomic write → receipt back
```

**FOUR ORDER CONSEQUENCES, EACH A ROW A REVIEW CAN FAIL.** **(1) NO GRAPH LOAD BEFORE THE HAND-OFF: a
boot graph rendered against an un-hydrated tier would render defaults a persisted value contradicts** —
and **a default rendered once is a value the operator sees** (`§5.9` row 5's no-invented-default rule).
**(2) THE HOST-SIDE `maxJournalLength` READ IS UNAFFECTED AND STAYS WHERE IT IS** (`§3.3` row 2.3-14:
tier 4, main-side, read at boot) — **the two boot reads are DIFFERENT tiers over DIFFERENT channels and
must not be conflated: tier 4's read is a snapshot over the manual-UI channel; tier 1's hand-off is the
new `Y-1`.** **(3) THE SETTINGS FILE MAY NOT EXIST — a cold tier is a MISS, never an error** (`§1.1`
store 1's failure mode 3), so **the hand-off must be able to answer `[]` and the renderer must boot on
that.** **(4) THE RENDERER IS NOW THE AUTHORITY FOR TIER-1 VALUES, SO THE RENDERER MAY NOT BE TOLD WHAT
TO BELIEVE BY A LATE PUSH IT DID NOT REQUEST** — `Y-3` is a change SIGNAL, and the renderer's own table
is updated from the RECEIPT (`Y-2`), never from a push that raced it.

**WHAT THIS REVISION DOES TO `§1.2`'s BOUNDARY FACT — IT STRENGTHENS IT.** `§1.2` recorded that the
layered read's `cache` member is a live object reference that **cannot cross an IPC boundary**
(`P-E6`), and concluded that **the architect's read shape is faithful in ONE realm only.** **The revision
takes that consequence to its end: every non-security tier is in that realm.** **The `cache` member
therefore never crosses anything, and `Y-1`/`Y-2` carry NAMES AND VALUES ONLY.**

**AND THE ONE THING THIS REVISION DOES *NOT* CHANGE: `§2.3`'s PARITY RULE AND `§2.4`'s CHANNEL HOME.**
**`§2.3`'s rule (a store value is MCP-visible iff a graph node carries it) is untouched** — the revision
moves where the values LIVE, not what may read them back. **`§2.4`'s decision was answered separately
(`Q-3`) and lands at option (a): the channel names and the tier constants live in a HOST-SIDE file shared
by `main` and the preload — `src/main/store-channels.ts` (PROPOSED) — and NOT in the vendored
`src/shared/types.ts`.** **Note the interaction the revision creates and state it plainly: `Y-1`/`Y-2`
are TIER-1 CHANNELS AND ARE NOT `IPC_SECURITY_*`; the security channels stay where they are and keep
their manual-UI-only discipline; and with all three non-security tiers in the renderer, `src/shared/
types.ts` need not move at all for the model's own channels.** **`§2.4`'s option (b) remains admissible
on its own merits (the shared surface is editable, STEER (A)) — but it is NOT the answer taken, so no
vendored byte moves for the channel constants.** `[H]`

**TWO CELLS OF `§2.2` THAT ARE NOW WRONG AND ARE NAMED SO THEY ARE NOT QUOTED.** **(a)** its
*"Cost per crossing"* clause 3 (*"the receipt is the only refusal channel … a fire-and-forget commit
loses the refusal"*) **SURVIVES VERBATIM and is now `Y-2`'s cost cell** — it was right as filed.
**(b)** its *"what this split costs"* clause 1 (**the mirror as a second holder**) is **WITHDRAWN with
the mirror** (`§7.3` `NW-1`'s deletion), and clause 2 (**a commit is asynchronous, so `commit` is not
usable from a synchronous turn**) **SURVIVES and is now MORE load-bearing**: with the values in the
renderer, **the temptation to write a synchronous commit is stronger, and the answer is unchanged — a
would-be synchronous commit site does not exist in this model.** `[H]`

---

## §3. The ownership ledger — one row per value layer 1 mapped

**COVERAGE CLAIM, STATED FIRST SO THE OMISSION CLASS IS VISIBLE.** Layer 1's storage map is **`§2.1`
(12 rows) + `§2.2` (17) + `§2.3` (17) + `§2.4` (15) + `§2.5` (10) = 71 value rows**, plus `§2.6`'s
**19 module rows** (a module census, treated as a group at `§3.4`). **All 71 rows appear below, once
each**, classified into exactly one of: **moves into store 1/2/3/4 · stays where it is · is deleted by
this change.** **Row labels are layer 1's own row identity (`§2.x` row order), so every cell is traceable
back to the map without re-quoting it.** Where this pass is **unsure**, the cell says so in the words
`UNSURE — stated, not smoothed`.

### §3.1 Main process — launch inputs and the two persisted stores (layer 1 `§2.1`, 12 rows)

| # | Row (layer 1 `§2.1`) | Class | The reason, in one line |
| --- | --- | --- | --- |
| 2.1-1 | **userData override** | **STAY** | A **launch input read before any store exists** (`src/main/main.ts` `userDataFromArgs`, `[H]`): **a store cannot hold the path that decides where the store's own file lives** — and the spec pins the argv route only (`docs/specs/ci-ui-leg.md` `§4` `ADD-2`). |
| 2.1-2 | **MCP transport kind** | **MOVE INTO STORE 1** (default carrier) | It is **config**, which is tier 1's own declared job. The **resolved per-process local STAYS** and the **argv/env precedence is unchanged** (`src/main/main.ts` `transportFromArgs`, `[H]`) — so the store supplies a *default*, never an override. Precedence to be pinned: **argv/env > tier 1 > literal**. |
| 2.1-3 | **MCP port** | **MOVE INTO STORE 1** (default carrier) | Same shape as 2.1-2 (`portFromArgs`, `[H]`). |
| 2.1-4 | **Operator security settings `{token, enabled[], maxJournalLength?}`** | **MOVE INTO STORE 4** | **This row IS the security cache**: same value, same file, same single writer site (`src/main/main.ts` `ipcMain.handle(IPC_SECURITY_SET)` → `securityStore.set`, `[H]`). The move is a **re-home into the model's own tier vocabulary plus the atomic-write requirement** — **not** a new store. |
| 2.1-5 | **the boot snapshot `persisted`** | **DELETED BY THIS CHANGE** | A **write-once local with no reader after the gate is built** — layer 1 `§7` `F-7`'s finding, verified by this pass's own read of `src/main/main.ts`: `const persisted = securityStore.get()` at `:74` is used once at `:75` and **never re-read** (`[H]`). In the model the gate reads the tier at its point of use. **This is a fix, cheaply earned** (`§7`). |
| 2.1-6 | **Module registry records** | **STAY** | A **domain store**, and the decision row says so: `NO-FOUNDATION-CONFIG-FILE-FACILITY` clause 1 names the two shipped files as *"domain-specific, not a general facility"* (`docs/decisions.md`, cited by row name; quoted in `docs/FORKER.md` `§4`'s `### PERSISTENCE` block (ii), read this pass). **Records are not config/settings; folding them into tier 1 would split the record across two files** (a join, and `syncModuleRouter`'s reader would then depend on both). **UNSURE — the optional consolidation (`§9` Q-5) is the architect's.** **⟶ ANSWERED 2026-10-01 (`Q-5`): THE CONSOLIDATION IS TAKEN — THIS ROW NOW MOVES INTO STORE 1** (the records migrate into `file.settings…`'s file; the migration plan, the SHA-256 re-verification's new home, the atomic discipline and the boot order are `§3.9` item (iii)). **The as-filed `STAY` classification and its two-file-join objection are kept visible and are SUPERSEDED: the join is REMOVED by the migration rather than created by it, because the record stops being split — it moves whole.** |
| 2.1-7 | **the store's `hash`** | **STAY** | **Always derived at `put()` from `source`** and re-verified at boot (`src/main/module-store.ts`, layer 1 `§2.1` row; `[H]`). A derived value with a single site — **not a store tenant**. |
| 2.1-8 | **`quarantined` (per record)** | **STAY** | **Re-derived every boot** (`sanitizeRecord` drops it from disk; layer 1 `§2.1`). A **derived** value; tier 1 stores *data*, not derivations. |
| 2.1-9 | **`corrupt`** | **STAY** | Per-process, re-derived at construction (layer 1 `§2.1`; `[H]`). |
| 2.1-10 | **`quarantinedAtBoot` Set** | **STAY** | An implementation detail with one reader/writer pair in `put()` (layer 1 `§2.1`). |
| 2.1-11 | **`installedAt`** | **STAY** | A **clock read** written onto the module record (layer 1 `§2.1`). Part of the record's identity, not a setting. |
| 2.1-12 | **`disabled` (per module)** | **STAY** | It **is** an operator setting, so tier 1 is a candidate — **but it is a field of a domain record whose file is the module store, and `syncModuleRouter`/`status().loaded` read it from there**. Moving it alone would create a **two-file join for one boolean** and a **second place `disabled` can disagree**. **UNSURE — if the architect wants settings centralized, this row is the one to rule on (`§9` Q-5), and the cost is a join + a re-sync ordering rule.** **⟶ ANSWERED 2026-10-01 (`Q-5`): CENTRALIZED — THIS ROW MOVES INTO STORE 1 TOGETHER WITH THE RECORDS IT BELONGS TO** (`file.modules.<id>.disabled`, in the same settings file as the record — **so the join the as-filed cell feared does not exist**). **The as-filed costs it named are ADDRESSED rather than dismissed: `syncModuleRouter`/`status().loaded` re-point to the store (one reader), `IPC_MODULE_SET_DISABLED` stays the ONE writer site (`main.ts`, `[H]` — preserved so `F-3`'s class does not grow), and the re-sync ordering rule is the boot order's own step (`§3.9` item (iii)).** |

### §3.2 Main process — the MCP server, the backend, the gate, the router (layer 1 `§2.2`, 17 rows)

| # | Row (layer 1 `§2.2`) | Class | The reason, in one line |
| --- | --- | --- | --- |
| 2.2-1 | **`SecurityGate._config`** | **STAY** | The **live reflection** of tier 4, replaced on every patch (`mcp.applyGatePatch` → `this._gate = this._gate.apply(patch)`). **It is not a cache**: it is the enforcement reader, and **the store must not become the gate**. `docs/decisions.md` `M1` (*"stdio re-gate is applied to the LIVE server"*) depends on this holder existing. **The two-holder shape therefore SURVIVES** — `F-6` is not fixed (`§7`). |
| 2.2-2 | **`ALL_TOOLS` (22 names)** | **STAY** | Compile-time data (`src/main/mcp-server.ts` `ProvidentMcpServer.ALL_TOOLS`). Layer 1 `§2.2`; quoted in `docs/FORKER.md` `§3`. |
| 2.2-3 | **`TOOL_GROUPS` (27 keys)** | **STAY** | Compile-time data (`src/main/security.ts` `TOOL_GROUPS`); the gate map. |
| 2.2-4 | **the two gate-map-only keys `module.disable`/`module.enable`** | **STAY** | Compile-time data; layer 1 `§7` `F-14`'s census caveat. |
| 2.2-5 | **the three `resource:` gate keys** | **STAY** | Compile-time data; they gate `ALL_RESOURCES` (`docs/specs/mcp-endpoint.md` `§3.7`). |
| 2.2-6 | **`ALL_RESOURCES` (3 defs)** | **STAY** | Compile-time data; layer 1 `§2.2`; `§3.7`'s `R1`–`R5`. |
| 2.2-7 | **`registered: Map<string, RegisteredTool>`** | **STAY** | **Per-server-instance** handle map, written by `registerTools`/`applyGatePatch` (layer 1 `§2.2`; `RH-11` is its staleness hazard). A store that mirrored it would be a **second authority over the tool surface** — refused. |
| 2.2-8 | **`resources: Map`** | **STAY** | Same as 2.2-7; `§3.7`'s `R2` live re-gate. |
| 2.2-9 | **`server`/`stdioServer`/`httpServer`/`httpServers` Set** | **STAY** | The transports themselves (`docs/specs/mcp-endpoint.md` `§2`, `§8`). Not data. |
| 2.2-10 | **MCP session state (HTTP)** | **STAY** | **None is held by the app** — `sessionIdGenerator: undefined`, a fresh server+transport per POST (`docs/specs/mcp-endpoint.md` `§2`'s stateless rule, read this pass). **A store must not introduce a session** — that would contradict a landed decision (`MCP-STATELESS-HTTP`). |
| 2.2-11 | **MCP session state (stdio)** | **STAY** | Lives in the SDK transport; the app holds only `isConnected()` (`§8`'s stdio-only push). |
| 2.2-12 | **`RendererBackend.pending` + `seq`** | **STAY** | A per-request map with three clearing paths (layer 1 `§2.2`; `docs/specs/renderer-backend-hardening.md`). **The store's X-2 commit is a new caller of this path, not a new tenant of it.** |
| 2.2-13 | **`ready`/`readyPromise`/`firstLoadSeen`** | **STAY** | The readiness gate (layer 1 `§2.2`; `RH-*`-adjacent). **A store read must never bypass the readiness gate** — the `invoke` path already waits on it, which is why X-2 inherits the gate for free. |
| 2.2-14 | **the three backend timeouts (`readyTimeoutMs` 30000 · `invokeTimeoutMs` 60000 · `largePayloadBytes` 1 000 000)** | **MOVE INTO STORE 1** | **The model's cleanest tier-1 tenant, and it needs no new member**: the constructor **already accepts them as options** and `main()` passes none (`src/main/mcp-server.ts` `:1043-1045`, read this pass, `[H]`) — so today they are **config with no config path**. Tier 1 supplies the values at construction; **the fields themselves stay per-process fields** (a store read is not re-consulted per request). |
| 2.2-15 | **the module `CapabilityRouter` (main instance)** | **STAY** | **Rebuilt from the module store on every sync** (`syncModuleRouter` → `clear()` + re-register). A derived view; tier 1 or 2 holding it would be a second authority over the dynamic tool set. |
| 2.2-16 | **the per-module `uploadQueue` buffer (MAX 1000, drop-oldest)** | **STAY** | Capped and ephemeral, owned by the module's own `ctx` (layer 1 `§2.2`; layer 2 `§4`). Not centralizable without changing `extensions.ts` (a vendored module). |
| 2.2-17 | **the `ctx.captureProvider`/`transforms`/`hooks` of the RENDERER-side router — "nothing exists"** | **STAY** | **Nothing exists** (layer 1 `§7` `F-2`). The plan creates no tenant here and **must not**: the renderer half's absence is a recorded spec-vs-reality finding for its own pass. |

### §3.3 Renderer — the app Runtime and its graph (layer 1 `§2.3`, 17 rows) — **ALL STAY, AND THAT IS THE LEDGER'S MOST IMPORTANT COLUMN**

| # | Row (layer 1 `§2.3`) | Class | The reason, in one line |
| --- | --- | --- | --- |
| 2.3-1 | **the mount `#app`** | **STAY** | A real DOM element (layer 1 `§2.3`; `docs/specs/mount-invariant-guard.md`). Not data. |
| 2.3-2 | **`Runtime.supervisor` (the graph)** | **STAY** | **The graph is authoritative and a store may never be** — `docs/specs/mcp-endpoint.md` `P-E2` (*"graph-canon, fragment-is-a-view"*) and its `§1`. **A store that held graph state would be a second authority over the app's own truth.** |
| 2.3-3 | **`Runtime.nodes`/`rootNode`** | **STAY** | In-memory caches of engine `Node` objects, re-read from the supervisor (layer 1 `§2.3`, the J3 note). Engine-owned. |
| 2.3-4 | **`prevStates`** | **STAY** | The render baseline; pruned by `render()` (layer 1 `§2.3`; `docs/specs/runtime-host.md` `§3.1`/`§3.7`). A render-internal cache — **a store holding it would put a generic indirection inside the diff loop**. |
| 2.3-5 | **`domPrevMap`/`ssrPrevMap`** | **STAY** | Same class as 2.3-4; reset by `resetRenderState()` (layer 1 `§2.3`). |
| 2.3-6 | **`Runtime.ssr` (`SSRFragmentAdapter`)** | **STAY** | Per-generation, recreated on reset (layer 1 `§2.3`; `R13-HOST-FIX`'s decision row). Engine-adapter-owned. |
| 2.3-7 | **`Runtime.bootstrapped`** | **STAY** | A boolean branch selector (layer 1 `§2.3`; `mount-invariant-guard.md` `§3.1` `M-19`). |
| 2.3-8 | **`cssIndex`/`propsIndex`** | **STAY — AND EXPLICITLY REFUSED AS A TENANT** | **Two holders of the element-id kind already exist** (the engine's registry + this derived index — layer 1 `§7` `F-5`). **A store keyed by authored ids or node ids would be a THIRD holder**, and `§1.3` R-5 forbids a reference from naming one. **This row is the ledger's clearest "do not centralize this".** |
| 2.3-9 | **`Runtime.payloads`** | **STAY** | Per-generation; dropped by `tearDownGraph()` (layer 1 `§2.3`; `docs/specs/runtime-host.md` `§3.6` `C3`/`C4`). |
| 2.3-10 | **the `userData` carried by payload 0** | **STAY** | Engine payload field; layer 1 `§7` `F-1` records the constructor-vs-load ambiguity — **an open contract question this plan does not touch.** |
| 2.3-11 | **`Runtime.envelope` (the last-loaded clone)** | **STAY** | **The authored UI's live copy**, and the spec pins the CRUD-vs-load split as deliberate (`docs/specs/mcp-endpoint.md` `§4.3` `P-C1`/`P-C2`). **A store holding the envelope would move the UI's authority out of the graph — refused.** |
| 2.3-12 | **`Runtime.warnings`** | **STAY** | Per-translate; an MCP-visible result member (`P-C3`, `R10`). Derived. |
| 2.3-13 | **`Runtime.renderOptions`** | **STAY** | A `readonly` literal (`{nodeIdAttribute: true}`). Compile-time constant. |
| 2.3-14 | **`Runtime.maxJournalLength`** | **STAY** (a boot-read projection of tier 4) | It is **already** read at boot from the persisted security store and passed into every `Supervisor` (`src/renderer/renderer.ts` `main()` → `new Runtime({…, maxJournalLength})`, read this pass `:354-363`, `[H]`). **Its home is tier 4; the field is a per-page projection — no move.** **The doc drift layer 1 `F-9` records must be fixed by the pass that touches `docs/specs/mcp-endpoint.md` `§3.6`, not by this model.** |
| 2.3-15 | **the engine journal (undo/redo stacks + the condensed `base`)** | **STAY** | Engine-owned; a store mirroring it would be a **second authority over the journal** and would break `J3`/`J4`'s stated shapes (`docs/FORKER.md` `§4`'s `J1-J8` digest, read this pass). |
| 2.3-16 | **the engine's `requestId` dedup LRU** | **STAY** | Engine-owned, capped at 128/10 000 ms (layer 2 `§1` row 5, from the engine dist). **A store-level dedup would duplicate `P-E4`'s engine-owned idempotence** — refused. |
| 2.3-17 | **the engine's node registry + destroyed tombstones + `hasPendingWork`** | **STAY** | Engine-owned. **The retention hazards on this row (`RH-1`, `RH-5`) are ENGINE-REACHABILITY problems a store cannot fix** (`§7`). |

**THE COLUMN'S VERDICT, STATED SO IT IS NOT READ AS AN OVERSIGHT: `0 of 17` graph-state rows become store
tenants.** The graph generation is **not** a cache and **not** a candidate: it is the authority everything
else is measured against (`P-E2`).

### §3.4 Renderer — the wiring-held holders, the gesture composition, the panes (layer 1 `§2.4`, 15 rows)

| # | Row (layer 1 `§2.4`) | Class | The reason, in one line |
| --- | --- | --- | --- |
| 2.4-1 | **the focus holder `holder.state = {entries, activeId}`** | **MOVE INTO STORE 2** | **The architect's tier 2 is what this holder already IS**: a module-level binding that **deliberately survives every graph load and teardown** (layer 1 `§2.4` row 1; layer 2 `§1` row 8, `docs/specs/focus-tool.md` `§2.1` item 6 / `§2.3` item 5). **The move buys two things and costs one**: it gives the holder a **declared cap** (which fixes `RH-4`'s unbounded `entries`) and a **lifetime tied to the realm rather than to a module binding**; it costs a **contract amendment to `focus-tool.md` `§2.1` item 6** (*the holder is the live authority* stays true; **its carrier changes from a module-level `const` to a tier-2 reference**, and the amendment must say so). **The model's own `persist(seam, state)` export (`docs/specs/focus-model.md` `§2.4` seam 3, the caller-called seam — quoted in `docs/FORKER.md` `§4`'s focus carry) is the natural write path and needs no new seam.** |
| 2.4-2 | **`MUTATING_METHODS` (7 members)** | **STAY** | A module-scope `Set` (`src/renderer/renderer.ts` `:15`, read this pass, `[H]`); it is what makes the notify push fire (`docs/specs/mcp-endpoint.md` `§8`). **A store must not add a member** (`§2.3`). |
| 2.4-3 | **the affordance wiring's `writes: GutterWriteReading[]`** | **DELETED BY THIS CHANGE** | Its only reader is a **discarded return value** and it has **no cap and no clear** (layer 2 `§4`'s `RH-6` row; `src/renderer/renderer.ts` `:77-94` and `:140`'s discarded hand-off, read this pass, `[H]`). **The model's commit receipt replaces its diagnostic duty**: the bounded **`mem.diagnostics.lastCommit`** (one entry) in tier 2 preserves layer 1 `L-5`/`ADV-GU-1`'s *"a REFUSAL IS A RECORDED READING, NEVER A SILENT NO-OP"* while fixing the unboundedness. **A deletion that loses the refusal reading is a REGRESSION** (`§7`). |
| 2.4-4 | **the live target element's inline `style.width` (the DRAG PREVIEW)** | **MOVE INTO STORE 3** (its DATA home; the write STAYS) | This is the architect's example's **first half** and the model's clearest win: **the in-flight value gets a data home**, while the DOM write **remains the declared presentation channel** (`src/renderer/renderer.ts` `applyPreview`, `[H]`; `docs/specs/gutter-ui.md` `§2.5` item 4 — *"the preview's concrete form is the caller's, and the working default is a transient inline-style write"*, read this pass). **The move does NOT delete the write and does NOT make the write the store**: the tier holds the value, the seam renders it. |
| 2.4-5 | **the handle element's `style.cursor`** | **STAY** | A per-hover presentation write with no data meaning beyond the consumer's declaration (`gutter-affordance.ts`/`demo-envelope.ts`'s `cursorOf`, layer 1 `§2.4`). |
| 2.4-6 | **the authored `gutter-status` node's `content` (the COMMITTED value)** | **STAY** | **In the graph, and that is the point**: it is the committed value's **MCP-visible** home, written by the wiring's one `state-slice` route (`src/renderer/renderer.ts` `write()`, `[H]`; `docs/specs/gutter-ui.md` `§2.1` item 8(v), `§3.1` `M-19`). **A store that held the committed value would be a second authority over it and would break `P-E2`. The store is the PERSISTENCE and the working copy; the graph is the authority.** |
| 2.4-7 | **the gesture session's state (ledger, active record, ids, counters)** | **STAY** | **The frozen delegate surface** (`docs/specs/gsession.md` `§2.5`, the eleven numbered items, read this pass; `docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`, cited by row name). **A store mirroring the session's ledger would be a SECOND AUTHORITY over the gesture lifecycle** — the `A-3`/`S-11` failure class (`docs/specs/foundation-app-data-model.md` `§5` `A-3`, read). |
| 2.4-8 | **the resize controller's state (`last size/bounds`)** | **STAY** | Composed on the frozen session; its sink is the wiring's `commit` seam (`docs/specs/gutter.md` `§2.1` seam 6 / `§2.5` item 4, as carried by `docs/FORKER.md` `§4`'s seam block (i)/(ii), read). **The controller's own `last size` is a gesture-scoped reading, not a store tenant** — tier 3 holds the *value*, not the controller's copy. |
| 2.4-9 | **the affordance's own state (`record`, `hovered`, `attached`, `detached`, `recoverable`)** | **STAY** | Per-attach closure state (`docs/specs/gutter-ui.md` `§2.6`, `§3.1` `M-*`). **The per-gesture `record` is discarded at every terminal** — that is the discipline a store must not loosen (a surviving `record` would be a leaked episode). |
| 2.4-10 | **the `#panes` mount** | **STAY** | A real DOM element; **never `renderedHtml`** (a different mount). `docs/specs/mcp-endpoint.md` `§6.4`'s isolation. |
| 2.4-11 | **the pane graph (`scope`, `supervisor`, `adapter`, `root`, `nodes`, `prevMap`)** | **STAY** | **An isolated `GraphScope` the MCP endpoints cannot reach** (`docs/specs/mcp-endpoint.md` `§6.4`; `docs/specs/secure-panels.md`). **`RH-3` (its uncapped journal) is NOT fixed by this plan** (`§7`) — a store is not a journal cap. |
| 2.4-12 | **`cfg: SecuritySettings` (the pane's snapshot)** | **STAY** | A **per-refresh snapshot** over the manual-UI channel (`src/renderer/secure-panels.ts` `refresh()`, layer 1 `§2.4`). **It must NOT be re-homed into a generic store** — routing the security snapshot through the generic read would put `secure.*` inside a fall-through structure and **widen `§6.4`'s channel by construction.** |
| 2.4-13 | **`debugValue`/`moduleStatus`/`moduleListText`** | **STAY** | Per-refresh fields (layer 1 `§2.4`; layer 2 `§4`'s *"1 each (scalar/string fields, reassigned)"*). |
| 2.4-14 | **the pane graph's node content/props** | **STAY** | In the pane graph (layer 1 `§2.4`). |
| 2.4-15 | **`window.provident`** | **STAY** | **The channel, not a value** (layer 1 `§2.4`: *"it is the channel, not a value"*). The store's preload additions ride this handle; they do not re-home it. |

### §3.5 Authored data, pure modules, and the harness (layer 1 `§2.5`, 10 rows)

| # | Row (layer 1 `§2.5`) | Class | The reason, in one line |
| --- | --- | --- | --- |
| 2.5-1 | **the demo envelope (authored UI)** | **STAY** | **Source bytes** (`src/shared/demo-envelope.ts` `demoEnvelope()`), with the live copy per graph generation. **The project-wide UI constraint (`AGENTS.md`) and `P-C1`/`P-C2` make the envelope the UI's authoring home; a store holding it would be a store authoring the UI.** |
| 2.5-2 | **`THEME_INITIAL_TOKEN = 'dark'`** | **STAY** | A module-scope source constant used as the `theme-setting` node's initial content (`docs/specs/theme-control.md` `§2.1` item 3, `P-TC-3`/`P-TC-4`). **It remains the SEED when tier 1 is cold** — see 2.5-3. |
| 2.5-3 | **the theme SETTING (the live appearance value)** | **MOVE INTO STORE 1** | It is **literally the architect's word for tier 1** (*"config, settings"*), and today it is **the app's clearest persistence absence**: it lives only as graph node content and **a re-boot reconstructs `'dark'`** (layer 1 `§2.5` row 3; layer 1 `§5` absence `A-6`). **The MIRROR RULE KEEPS `P-E2` INTACT: the graph stays the live authority and the MCP-visible carrier; tier 1 is the BOOT SEED and the COMMIT TARGET.** Precedence to be pinned: **while the app runs, the graph wins; the store supplies the boot value and receives the commit.** **The cost is the same architect gate as tier 1 itself** (`§5` conflict 1). |
| 2.5-4 | **the theme wiring role's carried attribute name (`'theme'`)** | **STAY** | An inert, deliberately-unread bounded wiring role in a host file (`src/renderer/renderer.ts` `themeWiringRole`, read this pass `:421-442`, `[H]`; `docs/specs/theme-control.md` `§2.4` items 1/2). **A code constant, not state**; and layer 1 `§7` `F-4` already records its zero call sites. |
| 2.5-5 | **the pane envelope** | **STAY** | A module-scope function in `src/renderer/secure-panels.ts`, compiled into the renderer bundle (layer 1 `§2.5`). Source bytes. |
| 2.5-6 | **the 19 modules of `src/shared/` (the roll-up row)** | **MOVES INTO THE MODEL — THE SHARED SURFACE IS IN SCOPE** *(re-classified by the SUPERSEDING STEER (A), 2026-10-01; the draft's `STAY — WITH A RULE` classification is RETRACTED alongside the rule it rested on)* | **The architect's ruling, verbatim: *"The shared modules should be edited to use the new data stores for owned data/settings and follow the event-listening paradigm for update triggers."* **So the fifteen fork-consumed modules are IN SCOPE and the per-module verdicts — which of them gains a store dependency, what it reads/writes through the store, and how the listener paradigm replaces its argument-passed reading — are at `§5.2.2`; the landed rows the ruling supersedes, each classified and costed, are at `§5.9`; and the fork's re-vendor arithmetic is at `§5.6`.** **Two clauses of the OLD rule SURVIVE as unmoved, and they are not re-openable by this ruling: (i) the `[X]` shim is out of scope (`H-r5`/`S-d3`'s NO-EXPANSION ban is not a store question and no store may become a shim tenant — `§3.5` row 2.5-7); and (ii) the PACKAGE is never edited (`docs/specs/mcp-endpoint.md` `P-E1`, `docs/FORKER.md`'s own rule).** **`src/shared/dom-shim.ts`, `types.ts`, `demo-envelope.ts` and `path-fork-cycle.ts` are the four modules the per-module table treats specially (`§5.2.2`), each with its reason.** |
| 2.5-7 | **the DOM shim's global element registry (`byId`)** | **STAY** | `[X]`-layer, module-level, in the harness bundle only (layer 1 `§2.5` row + `§2.6`; `docs/specs/foundation-app-data-model.md` `§7` `F-12`). **The ban is on EXPANSION** (`H-r5`, `S-d3`); the store must not become a shim tenant. |
| 2.5-8 | **the shim's ambient global `document`** | **STAY** | Same layer and the same ban (layer 1 `§6` `§2.6` row; `docs/specs/ci-ui-leg.md` `§0` prohibition 6). |
| 2.5-9 | **the battery host's gate (a literal)** | **STAY** | `[X]` harness: a constructor literal in `src/main/battery-host.ts` (`docs/specs/e2e-test-battery.md` `§6`). A harness value; a store read there would need a userData path the harness does not set. |
| 2.5-10 | **the standalone host's gate (absent → the constructor default)** | **STAY** | `src/main/standalone.ts` passes no `gate` (layer 1 `§2.5`; `docs/specs/mcp-server-wiring.md`). Same reasoning as 2.5-9 — **and note the asymmetry the model should not paper over: the standalone host has no tier-4 file, so the security tier is not a tenant there.** |

### §3.6 The absences layer 1 records, and the tenants this plan CREATES (6 rows — 4 new, 2 unchanged)

**Why this table exists.** The brief names four things that are **stored nowhere** today (`F-10` window
geometry, `F-11` the application menu, the layout record, and the "file tracking" facet of tier 1), and
**a plan that classified only layer 1's `§2` rows would silently omit them.** They are **not** layer 1
`§2` rows, so they are counted separately and the headline count keeps them apart.

| # | The absence (authority) | Class | The tenant this plan creates (proposed name), and its cost |
| --- | --- | --- | --- |
| A-1 | **window geometry** — `new BrowserWindow({width: 980, height: 720, …})`, literals, **no restore path, and no section or row naming the absence** (`F-10`; **re-verified by this pass's own read of `src/main/main.ts` `:158-160`, `[H]`**) | **MOVE INTO STORE 1 (NEW TENANT)** | **`file.window.bounds`** — written at main-side `resize`/`move` (debounced) and read at construction. **Cost: one main-side write per resize, and a bounds-validation rule (an off-screen restore is the classic failure).** **This is a genuine fix for `F-10` and it needs no IPC at all** (both the writer and the reader are `main`). |
| A-2 | **the layout record** (zone/pane sizes, tracks, the minimized mapping, the slot keys) — layer 1 `§3`'s *"Layout … nobody in this repo — the CONSUMER"* row; and the *"zero means minimized"* mapping is **CONSUMER-CARRIED by ruling** (`docs/decisions.md` `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`, cited by row name, read at that row) | **MOVE INTO STORE 2 (NEW TENANT: the WORKING record) + STORE 1 (NEW TENANT: the COMMITTED record)** | **`mem.layout.pane.<id>.size` / `mem.layout.pane.<id>.zone` / `mem.layout.zone.<id>.revealed`** (working) and **`file.settings.pane.<id>.size` / `file.settings.zone.<id>.min`** (committed). **The store is a CARRIER ONLY**: it ships **no** pane/zone token, no `is-minimized` literal, and **it must not implement the `0 ⇒ minimized` mapping** — that mapping stays the consumer's `census` + `revealed` predicate, as layer 1 `§6.2` derives and `docs/FORKER.md` `§4` block (iv) restates (read this pass). **Cost: the ruled family-side half (a pure minimum clamp over RECEIVED values, plus a received minimum and slot key) is a SEPARATELY-GATED unit the architect already admitted but has not filed** (`docs/decisions.md` `ZONE-SIZE-DOMAIN-…` clause 5: *"THIS row opens that gate and moves nothing by itself; the ledger stays `21 DONE / 0 open`"*). |
| A-3 | **the in-flight drag placement/episode** — nothing holds it as data today; the only carrier is the transient DOM style write (`[H]`, `§3.4` row 2.4-4) | **MOVE INTO STORE 3 (NEW TENANT)** | **`temp.drag.<gestureId>.placement` / `temp.drag.<gestureId>.preview`** — the architect's example's first half, and the episode's own tier. **Cost: an entry cap + a terminal sweep (C-5), and the hot-path listener budget (`§8`).** |
| A-4 | **the application menu** — **no `Menu`/`setApplicationMenu` anywhere in `src/main/**`** (layer 1 `§7` `F-11`; **re-verified by this pass's own read of `src/main/main.ts` in full: no `Menu` import and no menu call, `[H]`**), and the one in-tree artifact is a pure projection imported by nothing (`src/shared/menu-template.ts`) | **STAY — ABSENT (no tenant created)** | **Tier 1 is NAMED as its lawful future home** (`file.menu.*`), and **this plan creates no tenant**: inventing a menu-state payload with no menu is a speculative store, which is what `docs/pending.md`'s speculative-item discipline exists to prevent. **The row is recorded so the omission is a decision, not a gap.** |
| A-5 | **the "file tracking" facet of tier 1** — the architect's own third word for tier 1, and today the app's persisted-file set is known only to `scripts/electron-ui.mjs`'s **fixed two-name literal** (`['provident-security.json', 'provident-modules.json']`, quoted in `docs/FORKER.md` `§4`'s `### PERSISTENCE` block (iv), read this pass) | **MOVE INTO STORE 1 (NEW TENANT)** | **`file.tracked.<fileId>`** — the set of files the app itself persists, with the path and the writer. **Cost: a new value with a real consumer gap** — **the `ui` leg's witness list is a `scripts/**` literal, and "the app knows its own file set" does NOT fix that leg**; the store's list is **the app's** knowledge, and a leg that reads it would be a **new leg contract**. **Do not over-read this row as a witness fix.** |
| A-6 | **the reference grammar and its declaration table** (the model's own namespace) | **NOT A VALUE — the model's own metadata** | **`storeReferences`** (proposed, host-side): the single declaration that names every reference once (`§1.3` `R-2`/`R-3`). **Counted here only so the reader does not mistake the grammar for a forgotten tenant; it is not stored, not MCP-visible, and not a tier.** |

### §3.7 THE LEDGER'S VERDICT IN NUMBERS

**THE 71 LAYER-1 `§2` ROWS, COUNTED:**

| Class | Count | Which |
| --- | --- | --- |
| **MOVE INTO STORE 1 (`file`)** | **4** | 2.1-2 (transport default) · 2.1-3 (port default) · 2.2-14 (the three backend timeouts) · 2.5-3 (the theme setting) |
| **MOVE INTO STORE 2 (`mem`)** | **1** | 2.4-1 (the focus holder) |
| **MOVE INTO STORE 3 (`temp`)** | **1** | 2.4-4 (the drag preview's value) |
| **MOVE INTO STORE 4 (`secure`)** | **1** | 2.1-4 (the operator security settings) |
| **DELETED BY THIS CHANGE** | **2** | 2.1-5 (the boot snapshot `persisted`) · 2.4-3 (the `writes` array) |
| **MOVES INTO THE MODEL — THE SHARED SURFACE (the `§2.5-6` roll-up)** | **1** | 2.5-6 — **the fifteen fork-consumed `src/shared/**` modules are now IN SCOPE** (SUPERSEDING STEER (A)); **this one ledger row therefore carries FIFTEEN per-module store-dependency verdicts — see `§5.2.2`** |
| **STAYS WHERE IT IS** | **61** | everything else — **17 of them the whole app Runtime + graph (`§3.3`), which must NEVER become store tenants (`P-E2`); and `§3.5` row 2.5-7's `[X]` shim state, which the architect's shared-module ruling does not reach** |
| **TOTAL** | **71** | `4 + 1 + 1 + 1 + 2 + 1 + 61 = 71` ✔ (the identity is stated so a reader can check it against the tables) |

**THE CREATED TENANTS (counted separately, because they are not layer-1 rows):** **4 new** — A-1
(`file.window.bounds` → tier 1) · A-2 (`mem.layout.*` → tier 2 **and** `file.settings.pane.*` /
`file.settings.zone.*` → tier 1, **plus the four parked-semantics references of `§1.6`**) · A-3
(`temp.drag.*` → tier 3) · A-5 (`file.tracked.*` → tier 1). **Plus 2 unchanged absences recorded as
decisions (A-4 the menu; A-6 the grammar, which is the model itself).**

**AND THE ONE SENTENCE THE NUMBERS ARE SAYING:** **`61 of 71` layer-1 rows do not move their home, `17 of
71` are the app graph and must never move, and ONE row — the `src/shared/**` roll-up — carries the whole
shared surface's re-opening as fifteen separate verdicts.** **So the honest form of the number changed at
the SUPERSEDING STEER: `61` values keep their home, but "small and tier-shaped" is NO LONGER the right
adjective for the CHANGE SET — the shared surface is in scope, which is exactly why the fork arithmetic at
`§5.6` is now the plan's largest cost.** **A pass that later claims a larger move set must produce
row-level evidence for each added row, or it is re-homing by assertion.**

---

### §3.8 THE SECURITY CACHE'S READ PATH AND ITS REFUSALS — WHICH STORES IT MAY **NOT** BE READ FROM

**WHY THIS IS A MARKED SECTION AND NOT AN ASSUMPTION.** The architect's own sentence restricts the
fall-through read: *"for the non-security caches the default read method will be a function that searches
them in ascending order of durability…"* — so **the security cache is outside the layered read by
construction**, and this pass states its read path and its refusals explicitly so a later unit cannot
widen them by accident.

**THE MARKED RULE, ONE TABLE — "from which store may a `secure.*` value be read, by whom":**

| Reader | May read `secure.*` from | Refusal / constraint |
| --- | --- | --- |
| **`main` at boot** (the gate construction, `src/main/main.ts` `main()` — read this pass, `[H]`) | **the `secure` tier's OWN `get()` only** | It may **not** read through the generic `read()` — **the generic surface refuses the name** |
| **`main`'s manual-UI IPC handlers** (`IPC_SECURITY_GET`/`IPC_SECURITY_SET` → `securityStore.get()`/`.set(patch)`, `src/main/main.ts` `:93-99`, `[H]`) | **the tier's own `get`/`set`** | The channel stays **manual-UI-only by construction** (`docs/specs/mcp-endpoint.md` `§6.4`, read this pass) |
| **the operator pane** (`src/renderer/secure-panels.ts` `refresh()` → `bridge.security.get()`) | **a SNAPSHOT over the existing channel** — **never the tier, never a subscription** | It reads a **value**, not a handle; and it lives in the **isolated graph** the MCP endpoints cannot reach (`§6.4`; layer 1 `§2.4` rows 10–14) |
| **the app Runtime / the renderer wiring** (`src/renderer/renderer.ts`) | **`maxJournalLength` ONLY, once at boot, over the same channel** (read this pass `:354-363`, `[H]`) | **No token read, no group-set read**; and the runtime field stays a per-page projection (`§3.3` row 2.3-14) |
| **the generic layered read (`read`/`commit`/`subscribe`/`clear`)** | **NOTHING — every `secure.*` reference is REFUSED** (`§1.3` R-4) | **A typed refusal, never a silent miss**; the refusal is the mechanism that keeps "not in the fall-through" **a testable row** |
| **any MCP tool, resource or group** | **NOTHING** | `§6.4` + layer 1 `§5` `A-7` (*"An agent cannot grant itself capabilities"*); **no store value is MCP-visible except through a graph node** (`§2.3`) |
| **the tier-1 mirror (`file`'s renderer-side read-through copy)** | **NOTHING** | **The mirror mirrors tier 1 only** — `secure` has **no** mirror, which is why `§2.2` lists exactly three crossings (X-1/X-2/X-3) and none of them carries a `secure.*` value |

**AND THE THREE READS THE MODEL FORBIDS IN THE NEGATIVE, STATED SO A REVIEW CAN FAIL A UNIT ON THEM:**
**(1)** a `read('secure.operator.token')` anywhere in the renderer; **(2)** a `subscribe('secure.*')`; **(3)**
a tier-4 value inside a graph node, a tool result, a resource, or a notification payload. **Each is a row,
and each is a finding if present.**

---

### §3.9 THE TENANTS THIS AMENDMENT ADDS, THE `Q-5` MIGRATION, AND THE RECOUNT (2026-10-01)

**WHY THIS SUBSECTION EXISTS BESIDE `§3.6`/`§3.7` RATHER THAN INSIDE THEM.** `§3.7`'s verdict is an
**identity that closes** (`4 + 1 + 1 + 1 + 2 + 1 + 61 = 71`) and `§3.6`'s created-tenant count is
**`4` new**. **This pass adds tenants and re-classifies two rows, so the arithmetic MUST move — and it
moves by ANNOTATION BESIDE, never by rewriting the as-filed tables (`RCA-8(d)`).** **Every figure below
is printed WITH ITS TERMS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`' discipline applied to a census:
a total that is not the sum of its own terms is a finding).**

**(i) THE TABS SLICE'S TENANTS (NEW; `§1.7`).** **`A-7` — `file.tabs.*` → TIER 1.** The tab list's
entries, their order and their per-tab properties (`file.tabs.order` · `file.tabs.<tabId>.target` ·
`file.tabs.<tabId>.active` · `file.tabs.<tabId>.error` · `file.tabs.<tabId>.label`), **plus the RESERVED
landing reference `file.tabs.landing`** (`§1.3` `R-7`). **It is a NEW TENANT, not a layer-1 row: layer 1
mapped the focus HOLDER (its `§2.4` row 1 — the renderer's `{entries, activeId}` binding) and the tab
list as a persisted, constraint-checked, removable object did not exist anywhere in this tree.** **Cost:
one authored surface pair (landing + error, each with a `§5.U` live row — `§7.3` `NW-9`), a persisted
list whose retention is `§9.1` `OPEN-1`, and the repair arm's own failure modes (`§7.3` `NW-8`).**
**AND THE ONE THING THIS TENANT CHANGES ABOUT AN EXISTING ROW, STATED PLAINLY: `§3.4` row 2.4-1's move
of the focus holder into tier 2 is now SUBORDINATE — the holder's carrier still moves, but the
AUTHORITY for the entry set is tier 1's tab list, and `RH-4` (`§7.1`) is answered by that move rather
than by a cap on tier 2.**

**(ii) THE REGISTRY IS NOT A TENANT (and is counted so it is not mistaken for one).** It folds into
`§3.6`'s **`A-6`** row: **the reference grammar and its declaration table — NOT A VALUE, the model's own
metadata.** **The registry is that same row's SCHEMA half** (`§1.8`): it is **not stored in a tier, not
MCP-visible, not a value and not a reference** — **so `A-6`'s `NOT A VALUE` classification is unchanged
and the created-tenant count does not move for it.**

**(iii) THE `Q-5` MIGRATION — THE PLAN, THE SHA-256's NEW HOME, THE ATOMIC DISCIPLINE, THE BOOT ORDER.**
**THE MIGRATION, in five declared steps, each with its own row:** **(1) READ** — `provident-modules.json`
is read by `src/main/module-store.ts`'s existing `load` and its `sanitize` (the shape is landed, `[H]`).
**(2) VERIFY** — **the SHA-256 per-record re-verification moves with the record**: today the `hash` is
`always derived at put() from source` and re-verified at boot (`§3.1` row 2.1-7, `[H]`); **under the
migration the hash is VERIFIED AT MIGRATION TIME AND AT EVERY BOOT FROM THE STORE'S OWN RECORD**, and
**`quarantined`/`corrupt` stay DERIVED PER PROCESS (`§3.1` rows 2.1-8/2.1-9) — they are NOT migrated,
because a derived value is not data.** **(3) WRITE** — the records and the `disabled` flags land in
`<userData>/provident-settings.json` **through the tier-1 channel's ATOMIC write** (`§2.5`: `${path}.tmp`
+ `renameSync` + `fsync`), **one write, not one write per record**; **`disabled` is a FIELD OF THE RECORD
it belongs to (`file.modules.<id>`) — never a second top-level table.** **(4) THE ONE-BOOT WINDOW** — the
legacy file is **retained read-only for exactly ONE boot** (the migration is one-way; the settings file
wins from then on) **and the disagreement window is a DECLARED row with its own falsifier — not a silent
double authority** (`§1.1` store 1's failure mode 7). **The retention-then-removal of the legacy file is
a WORKING DEFAULT the architect may reverse; it is NOT an open question.** **(5) RE-POINT THE READERS** —
`syncModuleRouter`/`status().loaded` read from the store, and **`IPC_MODULE_SET_DISABLED` stays the SINGLE
writer site** (`src/main/main.ts`, `[H]`, preserved so `F-3`'s class does not grow).
**BOOT ORDER (the migration's step in `§2.5`'s chain):** **tier 4 (main, unchanged) → the tier-1 channel's
file read + migration check + the atomic re-write if a legacy file was found → `Y-1` hand-off →
the renderer's tiers → the router re-sync from the store → the first graph load.**

**(iv) THE RECOUNT, WITH ITS TERMS.** **THE 71 LAYER-1 `§2` ROWS, RE-COUNTED AFTER `Q-5`:**

| Class | As filed (`§3.7`) | NOW | Which moved |
| --- | --- | --- | --- |
| MOVE INTO STORE 1 (`file`) | 4 | **6** | **+ `2.1-6` (the module registry records) and `2.1-12` (the per-module `disabled` flag) — `Q-5`, ANSWERED** |
| MOVE INTO STORE 2 (`mem`) | 1 | 1 | — |
| MOVE INTO STORE 3 (`temp`) | 1 | 1 | — |
| MOVE INTO STORE 4 (`secure`) | 1 | 1 | — |
| DELETED BY THIS CHANGE | 2 | 2 | — |
| MOVES INTO THE MODEL — SHARED SURFACE | 1 | 1 | **the roll-up row now carries FIFTEEN verdicts, all with an edge (`§5.2.6`)** |
| STAYS WHERE IT IS | 61 | **59** | **− the two rows above** |
| **TOTAL** | **71** | **71** | **`6 + 1 + 1 + 1 + 2 + 1 + 59 = 71` ✔ — the identity still closes, which is the point of printing the terms** |

**THE CREATED TENANTS, RE-COUNTED:** **`5` new** — `A-1` (`file.window.bounds`) · `A-2`
(`mem.layout.*` **and** `file.settings.pane.*`/`file.settings.zone.*`, **plus `§1.6`'s four
parked-semantics references**) · `A-3` (`temp.drag.*`) · **`A-7` (`file.tabs.*`, NEW this pass)** ·
`A-5` (`file.tracked.*`). **Plus `2` unchanged absences recorded as decisions (`A-4` the menu; `A-6` the
grammar+registry, which is the model's own metadata) — and the as-filed `4 new` figure is kept visible in
`§3.6` while this table is the live count (`4 + A-7 = 5`).**

**AND WHAT THE NUMBERS STILL REFUSE TO SAY.** **`59 of 71` layer-1 rows do not move their home and `17`
of them are the app graph, which must never move (`P-E2`)** — so **the model is still a small move set
over layer 1's map.** **What changed is NOT the layer-1 move count; it is the SHARED SURFACE's scope
(`§5.2.6`: fifteen edges instead of the as-filed ten) and the new tenants (`5`).** **A pass that later
claims a larger move set must produce row-level evidence for each added row, or it is re-homing by
assertion — and `A-7` is the precedent for what that evidence looks like.**

---

## §4. The pane-drag worked end to end

**THE ARCHITECT'S EXAMPLE, WALKED IN THIS APP'S OWN TERMS.** Every hop names its **store write**, its
**listener**, its **seam**, and its **layer**. **The layer label is the layer that could OBSERVE the hop** —
often not the layer that produced it. **Seventeen hops; five of them are flagged `IMPOSSIBLE AS STATED`
with the lawful substitute named.**

**THE REFERENCE NAMES THIS WALK USES (all proposed, per `§1.3`):**

| Reference | Tier | What it holds |
| --- | --- | --- |
| `mem.layout.pane.p7.size` | `mem` | the working size of pane `p7` |
| `mem.layout.pane.p7.zone` | `mem` | the working slot key of pane `p7` (an **opaque** caller key) |
| `mem.layout.zone.z3.revealed` | `mem` | the consumer's reveal input for zone `z3` — **the consumer's decision, never a default** (`docs/specs/census.md` `§0` ruling 5 / `§2.4` `C-C`, as carried by layer 1 `§6.2`) |
| `temp.drag.g4.placement` | `temp` | the in-flight placement candidate of gesture `g4` |
| `temp.drag.g4.preview` | `temp` | the in-flight displayed size of `g4` (the revert's input) |
| `file.settings.pane.p7.size` | `file` | the committed size of `p7` |
| `file.settings.zone.z3.min` | `file` | the committed **received** minimum for `z3` |
| `mem.diagnostics.lastCommit` | `mem` | the bounded (1-entry) last-commit receipt |
| `secure.operator.*` | `secure` | tier-4 internal only; **never in the fall-through read** |

**THE WALK.**

| # | Hop | Store write | Listener that fires | What re-renders | Seam used | Layer |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | The operator presses the handle element the engine emitted for `GUTTER_AFFORDANCE_ID` at the boot render | — | — | nothing | the element was resolved **once** by `Runtime.elementForNodeId` in `src/renderer/renderer.ts` `startGutterAffordance` (`[H]`) | **`[U]`/APP** for the press; `[H]` for the resolution (`RH-2`'s boot-only fact) |
| **2** | Establishment: the affordance's `pointerdown` turn + the session's install listener; `onStartHook` reads the pre-drag size **exactly once** | **a READ**, not a write: `read('mem.layout.pane.p7.size')` → **hit in tier 2** → `{value, tier:'mem', cache, name:'mem.layout.pane.p7.size'}` | none (a read fires nothing) | nothing | `startSizeOf(element, token)` — the caller's seam (`docs/specs/gutter-ui.md` `§R.3`'s seam table, read at that section) | `[T]` for the session's turn; `[H]` for the read |
| **3** | Pointer moves; the affordance's own move turn runs **first** (registered at attach, before the session's tracking trio — `docs/specs/gutter-ui.md` `§2.3` row 8) | — | — | nothing | `pointerOf`/`resolveEventPointer` then `sizeFromPointer` then `clampToBounds` | **`[U]`** (the family's ONE coordinate read happens at the real pointer) |
| **4** | **A VALID placement is found** → the model's *"the function pushes updates to the temp cache"* | **`set('temp.drag.g4.placement', clamped)`** → **tier 3** | **the wiring's own subscription on that reference** — registered by reference at boot, `subscribe('temp.drag.g4.placement', fn)` | **NOTHING in the graph** — the listener drives the *presentation* channel only | `applyPreview({value, token, valid, resizable})` — the **declared consumer preview channel**, already implemented by the wiring (`src/renderer/renderer.ts` `applyPreview`, `[H]`) | **`[U]`** for the visible write; `[H]` for the listener |
| **5** | The temp write also carries the preview value | **`set('temp.drag.g4.preview', clamped)`** (same turn, same listener budget — see hop 6's cap) | the same listener may observe both refs — **the plan's rule: at most ONE presentation write per observed move** | nothing in the graph | `applyPreview`, once | `[U]` |
| **6** | **THE ARCHITECT'S *"the zone render iterates the contained panes, and when it detects that the dragged pane's location data is in the temp cache, it can automatically ghost the preview"*** | — | — | **`IMPOSSIBLE AS STATED.`** See the three-part flag below | **lawful substitute: the listener *drives* the ghost through the consumer's preview channel — the detection happens in the WIRING, not inside a render** | `[H]` (the substitute) |
| **7** | The session's own move turn then runs, reaching `E3`'s `wrappedOnMove` → the affordance's `onMoveHook` → `gesture.set(value)` | **no store write** (the value channel is the session's) | none | nothing | `gesture.set` — the session's value channel (`docs/specs/gsession.md` `§2.5` item 9, read this pass) | `[T]` |
| **8** | The consumer's *"proximity detection"* half: a candidate zone's distance is compared | **a READ**: `read('mem.layout.zone.z3.revealed')` (the consumer's own decision, tier 2) | none | **nothing on the hot path** — the reveal is **not** per-move | `withinProximity(distance, threshold)` — two caller-supplied scalars, the module's ONE pure comparator (`docs/specs/relocate.md`, `docs/decisions.md` `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`, cited by row name) | `[T]` for the comparator; `[H]` for the distance computation |
| **9** | **The ghost for a *non-hovered* candidate zone** (the relocate affordance's per-move transient) | **`set('temp.drag.g4.zone', <opaque candidate key>)`** | the listener on that ref | nothing in the graph | `onPreview` — `RelocateOptions`' own per-move presentation seam (`RelocateOptions.onPreview`/`PreviewSink`, quoted in `docs/FORKER.md` `§4`'s relocate carry, read this pass) | `[T]`+`[H]` |
| **10** | **An INVALID move** (a seam failure — an unusable bounds pair, a non-finite clamp answer) | **`sweep`**, not a commit: the temp entries for `g4` are cleared (rule C-5) | the listener fires with `cleared:[…]` and no value | nothing in the graph; the **visible revert** | `controller.reset(element)` (the module's ONE session-touching call) then `applyPreview({value: preDragSize, …})` — `docs/specs/gutter-ui.md` `§2.3` row 9's ruled revert | `[T]`+`[U]` |
| **11** | **Release — the `end` terminal** (`[U]` on a real pointerup) | the session's terminal runs: `detachTracking` first, then `record.active=false`, then the `onEnd` hook | none yet | nothing yet | the frozen session's `end` (`docs/specs/gsession.md` `§2.5` item 4: *"one commit"*) | `[T]` |
| **12** | The composed terminal hook computes the narrowed value and writes **once** | **`commit('file.settings.pane.p7.size', narrowed)`** → X-2's **one IPC `invoke`** → the main-side **atomic** write → **the receipt returns** | **on success: the commit event, ONE per reference, with `cleared:[…]`** — fired **after** the clears (rule C-2/C-3) | **the graph re-renders ONCE — through the ONE existing managed write**, not through the store | the wiring's single `commit` seam (`docs/decisions.md` `E10-SINGLE-SINK-CHANNEL`, cited by row name) | `[H]` for the write; the store's own event is `[H]` |
| **13** | **The single sink invocation's TWO effects, in ONE call** — (a) the existing graph patch, (b) the tier-1 commit | (a) `Runtime.applyCommand({kind:'state-slice', node: GUTTER_STATUS_ID, mutation:[{targetProp:'content', mode:'replace', value}]})` — **unchanged**; (b) the tier-1 commit | the listener(s) on `file.settings.pane.p7.size` and its declared lower aliases | **the graph, ONCE** (the patch) | (a) the managed channel; (b) the store's `commit` | `[H]` |
| **14** | **C-1 fires: the commit clears the lower tiers** | **`clear('mem.layout.pane.p7.size')` and `clear('temp.drag.g4.placement')`** — the declared aliases only (rule C-4) | delivered **inside the same one event's `cleared` array** (`§1.5`) | nothing extra | — | `[H]` |
| **15** | **The next read falls through to tier 1** | `read('mem.layout.pane.p7.size')` → tier 2 **miss** → tier 1 **hit** → `{value, tier:'file', cache, name:'file.settings.pane.p7.size'}` | none | nothing | the store's read | `[H]` |
| **16** | **"…causing it to render normally on update"** | the committed value is already in the graph (hop 13a) | — | **the graph is what makes it MCP-visible** (`get_rendered_html`/`get_node_state`) | `P-E2`'s graph-canon | `[H]` (the tool outputs); `[U]`/APP for "the operator sees it" |
| **17** | The refusal arm (a failed persist, a full cap, a malformed name) | the commit answers `{status:'refused'}`; **C-3: NOTHING is cleared**; the bounded **`mem.diagnostics.lastCommit`** records it | a refused commit fires `committed:false` **and no clear event** | **the graph is not patched** (the managed write is separate — see the flag below) | the receipt | `[H]` |

### §4.1 The five hops that are IMPOSSIBLE as stated, and the lawful substitute for each

**FLAG-1 (hop 6) — A CACHE READ *INSIDE* A RENDER.** *"The zone render iterates the contained panes, and
when it detects that the dragged pane's location data is in the temp cache, it can automatically ghost the
preview."* **In this repo the zone render is the ENGINE's** (`Runtime.render()` → `renderProducingProcess`
→ the `DomAdapter`, `[H]`; layer 2 `§5(a)`'s hops 12–13), **driven by the graph's compiled state. There is
no render-time seam through which a host cache can be consulted**, and adding one would be **a package
change** — forbidden outright (`docs/specs/mcp-endpoint.md` `P-E1`: *"No package edit … never modified"*,
read this pass; `docs/FORKER.md`'s rule *"this repo NEVER edits the package"*, read this pass).
**THE LAWFUL SUBSTITUTE: the LISTENER drives the ghost through the consumer's own preview channel.** The
cache-hit detection happens **in the wiring's subscriber**, which is exactly the shape
`docs/specs/gutter-ui.md` `§2.5` already rules: the preview is a *consumer* write, never a render
behaviour, and it is *"not a second rendering path"* (`§7` item 4, quoted by that spec's own `§2.5` item
4's correction, read this pass). **What is lost: "automatic" ghosting by the render. What is kept: every
observable the example wants.** **And what must NOT be done instead: a graph dispatch per move — that is
the spec's own NAMED HAZARD** (`docs/specs/gutter-ui.md` `§2.5` item 5: *"a preview implemented as a graph
dispatch re-renders the graph, and the re-render replaces the element under the pointer mid-gesture"*, read
this pass).

**FLAG-2 (hop 4's budget) — A PER-MOVE WRITE INTO THE **SINK**.** *"The cache write pings the event
listener"* could be read as *the temp write is the commit*. **It is not, and routing it through the commit
seam FAILS a landed decision**: the composition's single sink writer is `E3`'s `commit` seam, written **at
most once per gesture and only at a terminal** (`docs/specs/gutter.md` `§2.3` item 3 / `§2.5` item 4, as
carried by `docs/FORKER.md` `§4`'s seam block (ii) and by layer 1 `§3`'s gesture-lifecycle row;
`docs/decisions.md` `E10-SINGLE-SINK-CHANNEL`, cited by row name). **A per-move sink write makes the
sink's own count read `N` instead of `1` and FAILS the rows that pin *"cancel ⇒ zero sink writes"* and
*"one commit per gesture"*.** **THE LAWFUL SUBSTITUTE: the per-move temp write rides the PREVIEW-adjacent
channel (the wiring's subscriber → `applyPreview`), at most once per observed move; the SINK is touched
exactly once, at hop 12.** **And the counter-check the model must satisfy: a temp write that is NOT
presentation-related (a placement candidate the operator cannot see) may be written with no presentation
write at all — but it must still not touch the sink.**

**FLAG-3 (hop 14's scope) — "CLEARS THE VALUE IN A LOWER-PERSISTENCE STORE" READ AS *CLEAR ALL LOWER
STORES*.** A literal reading (clear every tier below, for every reference) would clear **unrelated**
working values and is refused: **C-4 restricts the clear to a reference's DECLARED lower aliases**, and
**a commit to a reference with no declared alias clears nothing.** **THE LAWFUL SUBSTITUTE is the
declaration table** (`§1.4` C-4) — and its cost is honest: **a mis-declared alias is a silent stale read**,
so the alias rows are part of the store's own contract, not a convention.

**FLAG-4 (hop 16's authority) — "COMMITTED TO THE FILE-STORED SETTINGS … CAUSING IT TO RENDER NORMALLY".**
Read as *the store's commit causes the re-render*, this **breaks the single-sink rule by introducing a
second write route** (the store → graph). **THE LAWFUL SUBSTITUTE: the store never writes the graph.** The
graph patch is (a) the **one managed `state-slice` write** inside the same sink invocation (hop 13a), and
**the store's commit is a side effect of that same invocation** — one invocation, two effects, one write
route to the graph. **Consequence to pin: a store commit that is NOT accompanied by a graph patch must not
be reported as "the pane rendered normally"** — a `[T]`/`[H]` store green is not a rendered claim
(`docs/specs/gutter-ui.md` `§2.2` `P-9`: *"No rendered-fact claim from the node suite"*, read at that
row).

**FLAG-5 (hop 8/9's family boundary) — A COORDINATE OR A GEOMETRY REACHING A PURE MODULE THROUGH THE
STORE.** If the store held a pointer position and a pure module read it, that would violate the family's
**no-coordinate/no-element** rules — the mandatory geometry clause `S-d11` (`docs/specs/zones.md` `§0`
ruling 6 / `docs/specs/census.md` `§0` ruling 6: *"any claim about the rendered geometry is UNPROVABLE in
this repo today"*), `docs/specs/container.md` `§3.4` `R-6` (*"no ELEMENT parameter anywhere in the
module's surface"*) and `§3.3` `I-6` (*"NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER"*), `docs/specs/
zones.md` `§3.3` `I-8` / `I-10`. **THE LAWFUL SUBSTITUTE: the store carries the CLAMPED VALUE and OPAQUE
CALLER KEYS (a slot key, a caller-measured distance) — never a coordinate and never an element**; the ONE
coordinate read stays where it already is (the affordance's own move turn, `[U]`), and a mechanism receives
plain values as arguments only.

### §4.2 What does NOT change in this walk — named, because the walk is easy to over-read

**The frozen gesture surface is not extended** (no new session member, no subscription on the session —
`docs/specs/gsession.md` `§2.5`'s *"Nothing else exists"*, read this pass). **The clamp is not moved or
duplicated** — `clampToBounds` stays the family's single pure clamp and a **second clamp site** (a
pre-normalising clamp inside a seam wrapper, in `attach`, or in `reset`'s refusal path) stays
**inadmissible** (`docs/specs/gutter.md` `§2.3` item 3 clause (iii) / `§4.4` `S-PURE-4`, as carried by
`docs/FORKER.md` `§4` block (ii), read this pass). **`U-RELOCATE`'s reveal stays exactly once per gesture
at the terminal** (`docs/decisions.md` `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`; *"a
per-crossing implementation will fail it"*, `docs/FORKER.md` `§4`, read this pass) — so **the store must
never become a per-move reveal channel**; the per-move channel is the ghost's (`onPreview`), and the
reveal's is the terminal's. **The committed value still lands as the authored status node's `content` and
it is still that node, not the store, that `get_rendered_html`/`get_node_state` read back.**

---

### §4.3 THE TABS WORKED WALK — the model's SECOND walk (2026-10-01)

**THE SLICE WALKED END TO END, in the same form as `§4`: every hop names its STORE WRITE, its LISTENER,
its SEAM and its LAYER.** **Twelve hops. Two of them are the model's REPAIR ARM in action, one is the
PERSISTED REMOVAL, one is the renderability query, and one is a ROUTED AMENDMENT rather than a hop.**
**The references are `§1.7`'s (all PROPOSED); the constraint is `§1.7` item 2's.**

| # | Hop | Store write | Listener that fires | What re-renders | Seam used | Layer |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **BOOT — the hand-off** (`Y-1`). The settings file holds `file.tabs.*`; the renderer receives it once | **a read + the in-realm tier's construction** — `read('file.tabs.order')` **hits tier 1 IN-REALM (zero crossings)** | none (a read fires nothing) | the first graph load renders the boot tab | the tier-1 channel's hand-off; **no selector, no DOM read** | `[H]` |
| **2** | **THE FIRST CONSTRAINT EVALUATION** — the hand-off's own tail: the constraint `exactly-one-active` runs **on the write that seated the handed-off record** (not on a later read) | if the record carries `0` or `≥2` active tabs → **a REPAIR write in the same operation** | **the same ONE event** (`§1.5`), whose receipt carries `repaired:[…]` | the graph patch that shows the active tab — **once** | the store's own constraint evaluation | `[H]` |
| **3** | **The operator (or an agent) focuses a TARGET** — `provident.focus`'s argument | **a READ, not a write**: `read('file.tabs.order')` to find-or-open the target's tab | none | nothing yet | the focus verb's own route (`src/renderer/renderer.ts` `focusRoute`, `[H]`) | `[H]` |
| **4** | **THE RENDERABILITY QUERY — HOST-SIDE, BEFORE ANY WRITE** (`§1.7` item 7). The wiring asks whether the target resolves to a rendered node | — | — | nothing | **`src/renderer/runtime.ts` `elementForNodeId(id)` → a value or `null`** (`[H]`, ALREADY LANDED — **no pure-module change, no seam, no coordinate**) | `[H]` |
| **5** | **THE ERROR ARM — the target does not resolve** (`null`) | **`set('file.tabs.<tabId>.error', <the caller's error token>)` + `set('file.tabs.<tabId>.target', target)`** — **tier 1, one commit, one `Y-2` crossing** | the subscribers on both refs → **ONE event per affected reference** (`§1.5`; two refs, two events, **each carrying its own `cleared[]`**) | **the ERROR PAGE — an authored surface** (`§1.7` item 6) | the tier-1 channel (`Y-2`); the authored page is the graph's | `[H]` for the write; **`[U]`/APP for the page** |
| **6** | **THE ACCEPT ARM** | **`set('file.tabs.<tabId>.target', target)`** (+ `active` in hop 8) | as hop 5 | the opened tab's authored content | as hop 5 | `[H]` |
| **7** | **A SECOND TAB OPENS — the constraint is re-evaluated** | **`set('file.tabs.order', order.concat([tabB]))` + `set('file.tabs.<tabB>.active', true)`** | the subscribers on `order`/`active` | the graph patch for the new active tab | `Y-2` | `[H]` |
| **8** | **THE REPAIR ARM FIRES: the write would leave TWO tabs `active=true`** | **the store REPAIRS IN THE SAME WRITE** — the outgoing tab's `active` is set `false` (`§1.7` item 3's declared outcome, `REPAIR`) — and **the receipt reports it** (`{status:'committed', repaired:[…]}`) | **ONE event per affected reference** — the newly-active tab's event **and** the cleared tab's event, **both with `cleared[]`; never a second event for the same reference** | the graph patch — **ONCE** | `Y-2`'s receipt is the repair's only reporting channel | `[H]` |
| **9** | **THE CLOSE VERB ON THE ACTIVE TAB** — the operator closes the active tab | **`remove('file.tabs.<tabId>.*')`, which is `§1.7` item 4's FIRST-CLASS operation: (a) delete at tier 1, (b) PERSIST THE REMOVAL through `Y-2`, (c) ONE event with `cleared:[…]` and no committed value, (d) clear the DECLARED lower aliases** | the subscribers on the removed refs (the one-event rule) **plus** the subscriber that drives the repair | **the repair's own write (hop 10) is what re-renders** | `remove` is the store's; the wiring's subscribers drive the page | `[H]` |
| **10** | **THE REPAIR ON CLOSE: THE NEXT SURVIVING TAB IS ACTIVATED IN THE SAME WRITE** (`§1.7` item 5 (a)) | **`set('file.tabs.<next>.active', true)`** — **the NEXT IS CHOSEN BY `file.tabs.order`, never by the store** | the subscriber on that ref | **the graph patch — ONCE** | `Y-2` | `[H]` |
| **11** | **THE CLOSE VERB ON THE LAST TAB — THE LANDING PAGE OPENS AS A TAB** (`§1.7` item 5 (b)) | **`remove('file.tabs.<last>.*')` then `set('file.tabs.landing.active', true)` in the same operation** — **the reserved reference CANNOT BE REMOVABLY EMPTY** (`§1.3` `R-7`: `remove` on it is REFUSED by name), so exactly-one-active holds **unconditionally** | the subscribers on both writes; **the landing reference's own subscriber drives the landing page's authored nodes** | **the LANDING PAGE — an authored surface** | `Y-2`; the page is the graph's | `[H]`; **`[U]`/APP for the page** |
| **12** | **THE PERSISTED REMOVAL, OBSERVED ACROSS A RESTART** | the removal is **in the FILE**, so a re-boot's `Y-1` hands off a list **without** the closed tab — **and the landing tab's entry is present because it was never removable** | none (a read fires nothing) | the boot tab | `Y-1` | `[H]`; **APP for "the operator sees the closed tab gone"** |

**FOUR CLAUSES OF THIS WALK THAT ARE NOT HOPS, STATED SO THEY ARE NOT INFERRED.** **(a) `unknown-id` IS
UNREACHABLE BY CONSTRUCTION** — hop 5 replaces the refusal with an error TAB, so **the refusal path the
tool's rows pin is amended, not exercised** (`§1.7` item 8; **ROUTED, its own gate**). **(b) THE REFUSAL
UNION IS FUNCTION-INTERNAL** — hop 5's token is **the caller's**, and **the store's own refusal
vocabulary (unknown name · wrong tier · reserved name · cap overflow) is a DIFFERENT vocabulary that
never enters `FocusRefusalCode`** (`§1.7` item 9). **(c) NO GRAPH DISPATCH PER MOVE-LIKE EVENT** — every
hop here is a discrete operator action, and **the ONE graph patch per accepted write is the managed
channel's** (`§4` FLAG-4's rule carries over unchanged). **(d) `set(name, undefined)` APPEARS NOWHERE IN
THIS WALK** — a tab is removed by `remove`, and **an `undefined` value would be a VALUE** (`§1.7` item
4). **AND THE HONEST LAYER LIMIT: of these twelve hops, exactly TWO carry a rendered-surface claim
(`5`'s and `11`'s authored pages), and both are `[U]`/APP — so a node-green on this slice is
ENVELOPE-green and never APP-green (`RCA-12`).**

---

## §5. Reconciliation with the landed record — the hard part

**One subsection per conflict. Each states the landed row/clause, what the plan would change, and the
classification: SUPERSESSION (architect-only) · A NEW CONTRACT WITH ITS OWN GATE · A COMPATIBLE
ADDITION.** **No landed rule is broken silently anywhere in this plan; where a supersession is required,
it is named in those words and routed to the architect.**

### §5.1 `NO-FOUNDATION-CONFIG-FILE-FACILITY` — the plan's first store directly implicates it

**THE LANDED ROW.** `docs/decisions.md` **`NO-FOUNDATION-CONFIG-FILE-FACILITY`** (2026-09-29, **ACTIVE**):
*"the foundation ships NO generic userData config/persistence facility: persistence is CONSUMER-side, a
foundation store is a NEW GATE that must not be smuggled in"* — with **seven clauses**, the two shipped
files named as **domain-specific, not a general facility**, `schemaVersion` grepping to **zero hits**, and
**the new-gate route stated AFFIRMATIVELY** (*"it is a boundary, not a permanent ban"*). Its sources are
`S-d4`, `S-d8` prohibition 4 and `H-r16`; the fork-facing form is `docs/FORKER.md` `§4`'s
`### PERSISTENCE — WHAT A FORK OWNS` (**read this pass**), which also records the boundary in the fork's
own words: *"This repo ships no generic userData store and no config-file API family."*

**WHAT THE PLAN WOULD CHANGE.** **Store 1 IS a generic, foundation-owned, userData file facility** — the
architect's own description (*"file-stored and synced persistent cache (to be used for config, settings and
file tracking) that stores both the data and the file that persists it"*) reads as exactly the thing the
row declines. **So this conflict is not peripheral: the directive's first store is the row's subject.**

**THE CLASSIFICATION — TWO READINGS, BOTH ARCHITECT-ONLY, AND THE PLAN TAKES NEITHER.**

| Reading | What it would mean | Cost | Consequence if the architect takes it |
| --- | --- | --- | --- |
| **(i) SUPERSESSION.** The architect supersedes clause 1 (*"persistence is CONSUMER-side"*) for this model. **Only the architect may supersede a landed row** — a spec pass, a unit or an orchestration pass may not, and this plan says so in those words. | The row moves to `SUPERSEDED` with its replacement named (the archive-truth convention, `AGENTS.md` item 6 / the annotate-never-rewrite practice this repo has used for every supersession). | **The fork-facing block loses its force**: `docs/FORKER.md` `§4`'s `### PERSISTENCE` block currently *forbids* exactly what the model adds, and the fork's own ask (`FOUNDATION-NO-CONFIG-FILE-PERSISTENCE`, answered by that block) **would be answered differently** — a fork-facing compatibility change, i.e. `AGENTS.md` item 10a's return point 2. | The block must be re-written and the fork owes **its own** pass (this repo writes no file under `<Astrographer>/`, `H-r6`'s return convention). |
| **(ii) THE ROW'S OWN AFFIRMATIVE ROUTE — a NEW GATE, OPENED OPENLY.** The plan is filed as **the new gate the row already names** — *"a foundation store is a NEW GATE"* — and the architect opens it for a **declared** facility (a written contract, a spec, a red set, a register, an audit) rather than a smuggled one. | The row's text **stands unchanged**; a **new ACTIVE row** records the opened gate, and the model's contract cites both. | The distinction between a *declared* facility and a *smuggled* one becomes load-bearing: **the plan must name what makes it declared** (a filed spec + the red set + the register + the adversarial pass + the tracker rows) — which it does. | No fork-facing reversal: the fork's own carrier recipe (`docs/FORKER.md` `§4` (iii): the returned-write seam, atomic replace, version-from-first-write) stays valid **and becomes the standard the foundation's own store must meet** (a happy consequence: the recipe was written for forks and now binds this repo's store too). |

**AND THE SUPERSEDING STEER SHARPENS THIS CONFLICT RATHER THAN RESOLVING IT.** **The shared-module ruling
removes the last route by which the facility could be described as *"host-side only"*: the store is now a
MECHANISM-LEVEL dependency, so the row's subject (a foundation-owned generic persisted facility reachable
from the shared surface) is squarely implicated, and the *"the fork owns its own carrier"* clause of
`docs/FORKER.md` `§4`'s `### PERSISTENCE` block can no longer be read as describing this repo's own
position** (`§5.9` row 19; `§5.6.4` (a)). **Both readings remain live and both remain architect-only.**

**RECOMMENDATION (a recommendation, never a decision — `§9` Q-4): reading (ii).** It costs nothing that
reading (i) buys, it keeps the fork-facing contract valid, it preserves the row's own stated route, and it
forces the plan's strictest discipline (a filed contract) onto the facility. **AND THE PLAN'S HONEST
WARNING, STATED PLAINLY: READING (ii) IS ONLY AVAILABLE IF THE ARCHITECT SAYS SO. A pass that assumes it
has smuggled the facility in, which is the exact failure the row's clause exists to prevent.**

**⟶ ANSWERED 2026-10-01 (`Q-4`): READING (i) IS TAKEN — THE EXPLICIT SUPERSESSION — WITH THE OLD ROW
KEPT VISIBLE BESIDE ITS REPLACEMENT.**

**WHAT THE ARCHITECT DECIDED, IN THE ROW'S OWN TERMS.** **A NEW ACTIVE row is landed in
`docs/decisions.md` BESIDE `NO-FOUNDATION-CONFIG-FILE-FACILITY`, and the old row is marked
`SUPERSEDED` with a DATED MARKER AND A POINTER — its own bytes are NOT rewritten** (the
annotate-never-rewrite convention, `AGENTS.md` item 6). **The route taken is (i): the facility is opened
by an explicit architect supersession of that row's clause 1 (*"persistence is CONSUMER-side"*) — NOT by
reading the row's own affirmative new-gate route, and NOT by a pass assuming either.** **The replacement
row's NAME is `FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY`
(cited BY ROW NAME, never by line); the design row it pairs with is
`FOUR-TIER-DATA-OWNERSHIP-MODEL`; both land in this pass (`§9.1` `Q-4`).**

**THE FOUR CONSEQUENCES, EACH NAMED WITH WHAT IT COSTS.** **(1) THE DECLARED-VS-SMUGGLED DISTINCTION IS
NOW ACADEMIC FOR THIS FACILITY AND STILL BINDING FOR EVERY OTHER ONE.** The row's clause 3 (*"a
foundation store is obtainable through its own gate … it may not be smuggled in via a mechanism's own
unit"*) **is not weakened**: what changed is that **the architect has OPENED this gate, for a facility
whose contract is this plan's and whose units are `§6.5`'s.** **A later store still owes clause 3.** **(2)
THE FORK-FACING BLOCK LOSES ITS FORCE AND IS OWED A RE-WRITE.**
`docs/FORKER.md` §4's **`### PERSISTENCE — WHAT A FORK OWNS`** block currently states *"the foundation
ships no generic userData store and no config-file API family"* — **which is now false.** **The block's
re-write is OWED to the pass `§5.6.4` names (`Q-14`'s one documentation pass, after `U-STORE-MODULES`
lands), and it is NOT performed by this pass** (`docs/FORKER.md` is not this pass's file). **Two clauses
of the block SURVIVE and become the standard the foundation's own store must meet: the atomic-write
discipline (which `§2.5` adopts as a channel requirement) and version-from-first-write (a tier-1 payload
carries its own schema version from its first write — a row the tier-1 unit owes).** **(3) `S-d4` /
`S-d8` prohibition 4 / `H-r16` ARE UNTOUCHED AS TEXT AND ARE NOW READ WITH THIS ROW.** **No clause of
`docs/specs/provident-electron-shell-chrome-handoff-review.md` is amended, weakened or retired here:**
the standing text that *"this repo must not acquire a UI-config store"* is a **prohibition on the
MECHANISM layer's ambient reads**, and **the store this row opens is a host-side, declared, gated
facility that mechanisms receive as an injected dependency — which is why `§7.4.2`'s `NW-4` row exists
and is load-bearing rather than decorative.** **(4) THE READINGS' OWN RECORD IS KEPT.** **`§5.1`'s
two-reading table and its recommendation of (ii) stay visible above as this plan's as-filed reasoning;
the DECISION overrides the recommendation, and the plan says so plainly rather than re-narrating itself.**

**AND ONE THING THE SUPERSESSION DOES *NOT* BUY, STATED SO IT IS NOT ASSUMED.** **It does not make the
fork's carrier question moot:** a fork may **keep its own carrier** (the block's recipe stays valid
advice) or **adopt this repo's facility through its own decision** — **`§5.6.3`'s step (3)/(4) are
unchanged, and the fork still owns that choice.** **Nor does it change `§3.1` row 2.1-6's domain store:
the SECURITY and MODULE stores remain DOMAIN stores — it is their RECORDS that migrate into tier 1
(`§3.9` item (iii)), never their domains into a generic schema.**

### §5.2 The shared surface is IN SCOPE — one store-dependency verdict per fork-consumed module

**THE RULING (the SUPERSEDING STEER (A), 2026-10-01, verbatim):** *"The shared modules should be edited to
use the new data stores for owned data/settings and follow the event-listening paradigm for update
triggers."*

#### §5.2.1 — The retraction, in those words **The draft of this section read *"NO STORE REACHES
`src/shared/**`, IN EITHER DIRECTION"* and rested on layer 1 `§5` absence `A-2` (`S-d8` `(C)#4`: *"a
UI-config store or any persistence of its own"*) plus ten landed contracts' no-store rows. THAT RULE IS
RETRACTED BY THE ARCHITECT'S OWN RULING, and this plan says so plainly rather than re-reading the ruling
into the old rule: the shared surface is **IN SCOPE**, and the modules it reaches **gain store dependencies
where they own data or settings**. The old rule's citations remain the record of what is being superseded —
they are enumerated, classified and costed at **`§5.9`**, one row each.**

#### §5.2.2 — What survives the ruling
Four things are **NOT** in scope, and none of them is a store question:
1. **THE PACKAGE IS STILL NEVER EDITED.** `docs/specs/mcp-endpoint.md` `P-E1` (*"No package edit:
   `node_modules/provident-ssr/` and `../Preempt-Providence/` are never modified"*, read this pass) and
   `docs/FORKER.md`'s own rule (*"this repo NEVER edits the package"*, read this pass). **An engine seam
   for a store read is OUT OF REACH** — which is exactly why `§4` FLAG-1's render-time detection has no
   lawful form.
2. **THE GRAPH STAYS AUTHORITATIVE.** `P-E2` (graph-canon, read this pass). **A shared module may read a
   store; nothing may read a store INSTEAD of the graph for a committed value** (`§7.3` `NW-2`).
3. **THE MCP SURFACE IS UNCHANGED.** No new tool/resource/group/method/notify member (`§5.5` `PAR-1`), and
   `secure.*` stays unreachable (`§3.8`).
4. **THE `[X]` SHIM IS OUT OF SCOPE.** `H-r5`/`S-d3`'s **NO-EXPANSION** ban is a harness boundary, not a
   purity claim, and the architect's ruling does not reach it: **`docs/specs/dom-shim.ts` gains no store,
   no member and no ambient read** (`docs/specs/ci-ui-leg.md` `§0` prohibition 6; `§3.5` row 2.5-7).

#### §5.2.3 — The fifteen fork-consumed modules, one row each The fifteen are the **fourteen mechanism
units `docs/FORKER.md` `§4` carries in its unit table plus `gutter-affordance.ts`** (`U-GUTTER-UI`/`E10`,
whose caller seams the fork explicitly filed for): `zones.ts` · `census.ts` · `gutter.ts` · `relocate.ts` ·
`container.ts` · `gesture-session.ts` · `menu-template.ts` · `layout-projection.ts` · `owned-list-host.ts` ·
`slot-host.ts` · `overlay.ts` · `theme.ts` · `focus-model.ts` · `mount-invariant-guard.ts` ·
`gutter-affordance.ts`. **Verdict values: `NO EDGE`** (the module's own bytes do not change; the paradigm
lands in its callers) · **`EDGE-READ`** / **`EDGE-READ+WRITE`** (the module gains a store dependency) ·
**`NEW CONTRACT`** (the edge is not reachable without superseding a frozen contract).

| # | Module | Verdict | What it reads / writes through the store (proposed references) | How the EVENT-LISTENING PARADIGM replaces its ARGUMENT-PASSED reading |
| --- | --- | --- | --- | --- |
| 1 | **`zones.ts`** (`U-ZONES`, family) | **NO EDGE** | nothing — it owns **no data and no settings** (`TrackSpec`'s three fields are all caller-supplied; the module's import census is **empty** and it holds **no module-level state**) | **The subscriber re-invokes `isEmpty`/`trackFor` with store-sourced arguments** (`mem.layout.zone.<id>.size` / `.display` / the consumer's `sizes` map). **A store read INSIDE this module would make its answer depend on ambient state — a SECOND AUTHORITY over the token and the emptiness decision, which is precisely what `V-13`'s remedy and the `A-19` probe exist to prevent.** So the paradigm lands **in the consumer's closures**, and the module stays a pure function of its arguments |
| 2 | **`census.ts`** (`U-CENSUS`, family) | **NO EDGE** | nothing — the four consumer decisions (zone set, reveal, sizes, specs) are the **CALLER'S**, and `revealed` is *"a CONSUMER DECISION, NEVER A DEFAULT"* | **The subscriber on `mem.layout.zone.<id>.display` / `.size` re-invokes `computeTrackVars`**, passing the store's values as the `revealed`/`sizes` arguments. **The module's `I-3` never-mutate/never-retain invariant and `I-4`'s delegation invariant are untouched — and that is what keeps the one-token-authority row (`A-19`) answerable after the change** |
| 3 | **`gutter.ts`** (`U-GUTTER`/`E3`, family) | **EDGE-READ** (reads only; **the sink stays the consumer's commit seam**) | reads **`mem.layout.pane.<id>.size`** (the pre-drag default / `defaultSizeFor`) and **`mem.layout.pane.<id>.bounds`** (the `boundsOf` pair — a **received** min/max, never a policy); **writes NOTHING** | The per-gesture `sizeFor` read at the committing terminal is answered from the layered read instead of from a caller-held variable; the **post-commit change** is delivered by the subscriber that the wiring registers on `file.settings.pane.<id>.size`. **The module's single sink call site is UNCHANGED (`S-PURE-4`'s one clamp site, `E10-SINGLE-SINK-CHANNEL`'s single writer) — the store is a READ dependency, and a write dependency here would be the two-writer failure** |
| 4 | **`relocate.ts`** (`U-RELOCATE`/`E4`, family) | **EDGE-READ** (reads the threshold/candidates/distance; **writes only through its existing sinks**) | reads **`mem.layout.zone.<id>.slot`** (opaque) and **`mem.layout.zone.<id>.distance`** (a caller-measured scalar) and the consumer's threshold; writes via `onReveal` (once, at the terminal) and `onPreview` (per move) — **both consumer sinks, neither a store write** | The candidate set and the distance stop being hand-passed per call: the subscriber on the slot/distance refs re-invokes the consumer's candidate builder, and the module's `withinProximity` still compares **two scalars**. **The reveal stays EXACTLY ONCE per gesture at the terminal and the ghost stays per-move — the model does not become a second reveal channel** (`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`) |
| 5 | **`container.ts`** (`U-CONTAINER`/`E5`) | **NO EDGE** | nothing — three pure total functions; the one owned thing is an **unparsed declaration string it RETURNS** | The subscriber re-invokes `tokensFor`/`orientationFor` and the declaration is applied by the consumer. **`I-2` (*"NO MEMBER OF `chrome` IS CONSULTED FOR ANY DECISION"*) and `P-CT-13`'s `B-3` working default survive intact — and must, because a store-sourced `chrome` read would put the emptiness decision in a place `V-13`'s class has already closed** |
| 6 | **`gesture-session.ts`** (`U-GSESSION`/`E6`) | **NO EDGE — and this is the plan's one `NEW CONTRACT` candidate, priced at `§5.9` row 9** | **nothing** in the model as planned | **The session's turns are already observable at the COMPOSITION boundary** (the controller's wrapped `onStart`/`onMove`/`onEnd`/`onCancel`), so the paradigm lands there and the per-move store write happens in the affordance's own move turn. **IF the architect reads *"follow the event-listening paradigm"* as *the session itself must EMIT change events*, then a session-level channel (`session.subscribe` / an `onChange` install hook) supersedes the FROZEN surface and owes its own gate** — `§5.9` row 9, `§9` Q-8 |
| 7 | **`menu-template.ts`** (`U-MENULIB`/`E7`) | **EDGE-READ** (latent — imported by **no** `src/**` file today, `F-11`) | reads the **catalog** (**proposed `file.menu.catalog`**) once a consumer exists | The catalog's change becomes an event: a subscriber re-invokes `normalizeCatalog`/`buildMenuTemplate`. **Latent by construction: the dependency becomes live only when a menu consumer ships (`F-11` names the absence, and this plan creates no menu tenant — `§3.6` A-4)** |
| 8 | **`layout-projection.ts`** (`U-PROJ`/`D4`) | **NO EDGE** | nothing — pure projection + a total applier over an **injected** write sink | The **sink** is the host's (`applyProjection(projection, sink)`), so the store-backed sink is a **host-side** implementation and the module stays argument-pure. **`RK-19`'s false-green class — a projection green reported as a rendered fact — is untouched** |
| 9 | **`owned-list-host.ts`** (`U-LISTHOST`/`D2`) | **EDGE-READ+WRITE** | reads/writes the host's **owned-node records and order** (**proposed `mem.list.<hostId>.order`** / `mem.list.<hostId>.node.<key>`) | Order changes stop being hand-passed: a subscriber on the order ref re-invokes the host's `render`/`setOrder` path. **The own-node ownership rule and the foreign-sibling rule are unchanged; the store holds the host's own records, not the container's** |
| 10 | **`slot-host.ts`** (`U-SLOTHOST`/`D3`) | **EDGE-READ+WRITE** | reads/writes the **opaque key → placement/container record** (**proposed `mem.slots.<hostId>.<key>`**) | A placement change becomes an event; the subscriber re-invokes the host for that key. **The typed refusal for an undeclared key stays the module's, and the container source stays the injected factory — the store must NOT become the container source** (`SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` stays unmoved) |
| 11 | **`overlay.ts`** (`U-OVERLAY`/`E9`) | **EDGE-READ+WRITE** | reads/writes the **overlay state** (**proposed `mem.overlay.<name>.state`**) and the returned inert declaration's inputs | The state transition's observers become a subscriber on the state ref; the **declaration stays a RETURNED write the consumer applies** (`E5-B-1`'s form is preserved: the store must not apply it) |
| 12 | **`theme.ts`** (`U-THEME`/`E8`) | **EDGE-READ** (**the strongest "owned settings" case in the tree**) | reads **`file.settings.theme.token`** (the setting's committed value) | The appearance setting's change becomes an **event**: a subscriber re-invokes `resolveTheme`, and the wiring mirrors the resolved value into the authored `theme-setting` node (`§3.5` row 2.5-3's seed/sink rule). **`THEME-MECHANISM-AND-AUTHORED-CONTROL`'s no-store clause is superseded by this ruling — `§5.9` row 12** |
| 13 | **`focus-model.ts`** (`U-FOCUS-MODEL`/`F2`) | **EDGE-READ+WRITE — and it needs NO byte change to the seam** | reads/writes **`mem.focus.entries`** / **`mem.focus.activeId`** — **through its own already-exported `persist(seam, state)`**, which today *"is a top-level value export the CALLER calls … IT IS NOT CALLED BY `focusTransition` AT ALL"* (`docs/FORKER.md` `§4`'s focus carry, read this pass) | **The paradigm is the seam that already exists**: the caller's `persist` seam becomes the tier-2 write path, and the subscriber on the focus refs re-renders/re-answers. **This is the cleanest adoption in the tree — the state's home moves (`§3.4` row 2.4-1) and the module's surface does not** |
| 14 | **`mount-invariant-guard.ts`** (`U-MOUNTGUARD`/`D1`) | **NO EDGE** | nothing — a probe/instrument module imported by **no** `src/**` file | No reading to replace: the probe takes a mount and answers a verdict. **A store-backed probe would be a probe of the store, which is not what this unit measures** |
| 15 | **`gutter-affordance.ts`** (`U-GUTTER-UI`/`E10`) | **NO EDGE** (the paradigm lands in its **wiring**, one layer up) | nothing directly — but **the wiring that drives it** performs the tier-3 written in `§4` hop 4 | **The affordance's own per-move turn is the WRITE POINT** (`set('temp.drag.<gestureId>.placement', …)` → the subscriber → `applyPreview`). **The module gains no import: its seams (`applyPreview`, `commit`, `startSizeOf`, `boundsOf`) are already the caller's, and their implementations become store-backed.** **`E10-SINGLE-SINK-CHANNEL` and the one-clamp rule are preserved by construction (`§5.3` SINK-1..5)** |

**THE FOUR MODULES THE TABLE DOES NOT LIST, EACH WITH ITS REASON (so the fifteen are visibly fifteen and
not a hand-picked set).** **`dom-shim.ts`** — **`[X]` harness, OUT OF SCOPE** (`§5.2.2` item 4; the
no-expansion ban). **`types.ts`** — constants and types only, no data; **its own byte-change question is
the IPC-channel carve-out, which the architect's ruling now makes moot** (**`§5.6`**: if shared modules may
be edited at all, the channel constants may live there). **`demo-envelope.ts`** — **authored UI DATA**, the
app's own envelope; it is not a mechanism and its live copy is the graph's (`§3.5` row 2.5-1). **`path-fork-
cycle.ts`** — a **test-fixture envelope builder** (a battery artifact), not app data.
#### §5.2.4 — The honest finding the table produces **Ten of the
fifteen gain an edge; five do not — and the five are the PURE KERNELS that own nothing (`zones`, `census`,
`container`, `layout-projection`, `mount-invariant-guard`), plus `gesture-session` whose edge question is a
frozen contract rather than a store question.** **This is NOT the old rule's spirit surviving by another
route:** the ruling's own qualifier is *"for owned data/settings"*, and a module with **no owned data and
no settings** has nothing to put in a store. **Where the plan is UNSURE, it says so: whether the architect
intends EVERY shared module to hold a store handle regardless of whether it owns data is an open question
(`§9` Q-13), and the answer changes the verdicts of rows 1, 2, 5, 8 and 14 — every one of which would then
become `EDGE-READ`.** **A pass that cannot classify a row must record it as a finding rather than pass it:
the rows above are all classified, and the one classification this pass cannot make from landed text
(the intent behind the qualifier) is filed as Q-13.** **⟶ ANSWERED 2026-10-01 (`Q-13`): THE QUALIFIER IS **NOT** RESTRICTIVE — ALL FIFTEEN MODULES ADOPT THE PARADIGM, so FIVE of the verdicts in the table above MOVE from `NO EDGE` to an edge and the `A-19` probe's extension becomes MANDATORY rather than prudent: read `§5.2.6` beside this subsection, which keeps this paragraph's FINDING as the record of what the plan could not classify.** **AND ONE ARITHMETIC DISCREPANCY IS RECORDED RATHER THAN SMOOTHED: this subsection's opening sentence says *"Ten of the fifteen gain an edge; five do not"*, while `§5.2.3`'s own table carries EIGHT edges and SEVEN `NO EDGE` (`8 + 7 = 15`). The two figures disagree; the answered scope is FIFTEEN, which supersedes both — and the discrepancy is recorded because a census that does not close over its own rows is exactly the class the repo's `RAW-STRING-CENSUS-RETIRED` row exists to refuse.**

#### §5.2.5 — The mechanical consequences of the edges
**(i) IMPORT CENSUSES CHANGE**: every module that gains an edge breaks its own *"imports NOTHING"* /
empty-import-census row **except `focus-model.ts`** (whose `persist` seam already exists) — so **the
register rows, the census rows and the static import/scope sweeps of those units are re-graded**
(`zones.md` `§3.4` `R-3`, `container.md` `§3.4` `R-1`, `focus-model.md`'s empty-census row, `gutter.md`
`§2.2` `P-9`, `relocate.md`'s single-type-only-import row, `overlay.md`'s empty-import-census and empty
seam set, `theme.md`'s empty import census and empty seam set, `listhost`/`slothost`'s no-import rows).
**(ii) THE REGISTERS RE-GRAIN, NOT SHRINK**: the pure-arithmetic rows stay, and **a new family of rows
appears** (the module's store reads, its refusals, its retention discipline) — `≤8` is a
**component-breakdown signal, never a ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-…`).
**(iii) EVERY AFFECTED UNIT'S SPEC GAINS A SECTION** for its store dependency, its references and its
listener. **(iv) THE LIVE BATTERY BECOMES MANDATORY FOR THE ONES WITH A RENDERED FLOW**
(`docs/specs/user-flow-audit.md` `§7.1` limb A/B — a module whose reading now arrives by event is a
changed user-visible flow where a rendered surface exists). **(v) THE FORK RE-VENDORS** — `§5.6`'s
arithmetic, which is now the plan's largest cost.

#### §5.2.6 — THE ANSWERED SCOPE (`Q-13`, 2026-10-01): **ALL FIFTEEN MODULES ADOPT THE STORE/EVENT PARADIGM**

**THE ANSWER, VERBATIM IN SUBSTANCE.** **The qualifier *"for owned data/settings"* is NOT read as
restricting the set: ALL FIFTEEN fork-consumed shared modules adopt the store/event paradigm** — not only
the ten that own data or settings. **So every row of `§5.2.3`'s table carries an EDGE, the five pure
kernels included** (`zones.ts` · `census.ts` · `container.ts` · `layout-projection.ts` ·
`mount-invariant-guard.ts`), **and `gesture-session.ts` — the one module whose edge would be a
frozen-contract change — carries it through the COMPATIBLE route `§5.4` fixed (`Q-8`: no session member;
the paradigm lands at the composition boundary and in the store's own `subscribe`).**

**THE 15-ROW VERDICT SET — one row per module: its edge · what it reads/writes through the store · the
register/contract cost it owes.** **Everything here is PROPOSED; the references are the plan's own
(`§1.3`/`§1.7`); the module NAMES are the landed `src/shared/**` files (`docs/FORKER.md` `§4`).**

| # | Module | Edge (ANSWERED) | What it reads / writes through the store | Its register / contract cost |
| --- | --- | --- | --- | --- |
| 1 | **`zones.ts`** | **`EDGE-READ`** (as filed: `NO EDGE`) | reads the caller's `mem.layout.zone.<id>.size` / `.display` / `.slot` **AS ARGUMENTS the caller passes in** — **the store read happens in the CONSUMER'S CLOSURE, never inside the module** | **a new store-dependency SPEC SECTION + a re-grained register** (the store read, its refusal, its retention) + **the `NW-4`/`§1.7` item 10 HARD ROW** (the ambient-read constraint) + `RS` |
| 2 | **`census.ts`** | **`EDGE-READ`** (as filed: `NO EDGE`) | same shape as row 1: the four consumer decisions arrive as arguments, the store is the CALLER'S source | **spec section + register re-grain + `A-19`'s probe EXTENDED (now MANDATORY — `§5.9.1`)** + `RS` |
| 3 | **`gutter.ts`** | **`EDGE-READ`** (unchanged) | `mem.layout.pane.<id>.size` · `.bounds`; **writes NOTHING** (the sink stays the consumer's) | `CA` + `RG` + `RS` + `FV`; **`P-9` re-worded, `P-10` gains its mandatory companion** |
| 4 | **`relocate.ts`** | **`EDGE-READ`** (unchanged) | `mem.layout.zone.<id>.slot` · `.distance` + the caller's threshold; writes only through `onReveal`/`onPreview` | `CA` + `RS` (by-channel rows) + `LB` + `FV` |
| 5 | **`container.ts`** | **`EDGE-READ`** (as filed: `NO EDGE`) | reads the store-sourced `chrome`/token INPUTS **that the caller hands it** — **and `I-2` (*"NO MEMBER OF `chrome` IS CONSULTED FOR ANY DECISION"*) is the row that must stay green** | **spec section + register re-grain + the `P-CT-13`/`I-2` negative row with its positive control** + `RS` |
| 6 | **`gesture-session.ts`** | **`EDGE-READ+WRITE` VIA THE COMPOSITION BOUNDARY ONLY** (`Q-8`: **NO session member is added**; the frozen `§2.5` list is untouched) | the session's turns are observable at the composition boundary; **the per-move store write rides the affordance's own move turn, and the store's own `subscribe` is the read side** | **`CA` only** — the composition boundary's role named; **no `RG` for this module, no `gsession.md` byte, no FROZEN-CONTRACT change**; `FV` **NO** (the module's bytes hold) |
| 7 | **`menu-template.ts`** | **`EDGE-READ`** (latent) | the catalog (**`file.menu.catalog`, PROPOSED**) — **latent until a menu consumer ships (`F-11`; no tenant created, `§3.6` `A-4`)** | `CA` + `RG` + `FV` (**deferrable while latent**) |
| 8 | **`layout-projection.ts`** | **`EDGE-READ` THROUGH ITS INJECTED SINK** (as filed: `NO EDGE`) | reads the store through the HOST'S sink implementation — **the module stays argument-pure: `applyProjection(projection, sink)` is unchanged** | **spec section + register re-grain** (the sink is now store-backed) + **`RK-19`'s false-green class re-asserted** + `RS` |
| 9 | **`owned-list-host.ts`** | **`EDGE-READ+WRITE`** (unchanged) | `mem.list.<hostId>.order` / `.node.<key>` | `CA` + `RG` + `RS` + `FV` |
| 10 | **`slot-host.ts`** | **`EDGE-READ+WRITE`** (unchanged) | `mem.slots.<hostId>.<key>`; **the store must NOT become the container source** | `CA` + `RS` (the negative row) + `FV` |
| 11 | **`overlay.ts`** | **`EDGE-READ+WRITE`** (unchanged) | `mem.overlay.<name>.state`; **the declaration stays RETURNED, never applied** (`E5-B-1`) | `CA` + `RG` + `RS` + `FV` |
| 12 | **`theme.ts`** | **`EDGE-READ`** (unchanged) | `file.settings.theme.token` | `CA` + `RG` + `RS` + `FV` + **`LB`** |
| 13 | **`focus-model.ts`** | **`EDGE-READ+WRITE` VIA ITS EXISTING `persist` SEAM** (unchanged) | `mem.focus.*` through the already-exported caller-called `persist` — **and under the tabs slice (`§1.7`) the AUTHORITY is tier 1's tab list** | `CA` + `RG` (the `persist` seam's target changes semantics) + `FV` **NO byte change** |
| 14 | **`mount-invariant-guard.ts`** | **`EDGE-READ`** (as filed: `NO EDGE`) | **the store as a probe INPUT: the module reads a store-sourced mount/verdict input through its caller** — **a store-backed probe is a probe of a store-sourced mount, NEVER a probe of the store itself** | **spec section + register re-grain** + **the negative row that the probe does not become a store probe** + `RS` |
| 15 | **`gutter-affordance.ts`** | **`EDGE-READ+WRITE` VIA ITS OWN SEAMS** (as filed: the wiring moved) | its `applyPreview`/`commit`/`startSizeOf`/`boundsOf` implementations become store-backed; **the tier-3 write is performed by the wiring at the affordance's own move turn** | **`CA`** (the seam implementations documented) + `RS` + **`LB`** + `FV` **NO byte change to the module** |

**FIVE ROWS THAT ARE NOW `EDGE` AND WERE NOT (1, 2, 5, 8, 14) — AND THE ONE THING THAT MAKES THEM SAFE.**
**A pure kernel with a store read is a kernel whose answer depends on STATE**, which is precisely the
`NW-4` hazard (`§7.4.2`). **The answer's own safety property, stated as a HARD DESIGN ROW and carried at
`§1.7` item 10: the store read enters a kernel ONLY as an ARGUMENT THE CALLER PASSES — the paradigm lands
in the CONSUMER'S CLOSURES, and the store NEVER becomes the source of the emptiness / token / reveal /
min-max / gesture-lifecycle / element-id DECISION.** **A unit that grants a pure kernel a store edge for a
consumer decision is a FINDING, not a design choice** — and **the `A-19` probe's fifth question is now
MANDATORY rather than prudent** (`§5.9.1` item (ii)).

**AND THE MECHANICAL CONSEQUENCES THIS ANSWER MULTIPLIES.** **`§5.2.5`'s five items all stand and all
WIDEN:** **(i) five more modules' import censuses change** (so five more units' static import/scope
sweeps are re-graded); **(ii) five more registers re-grain — and re-grain is a WIDENING, never a
shrink** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-…`); **(iii) five more unit specs gain a store-dependency
section**; **(iv) the live battery's reach extends to any of the five whose reading now arrives by event
AND whose unit has an assembled rendered flow** (`docs/specs/user-flow-audit.md` `§7.1` limb A/B — for
these five kernels that is **CONDITIONAL**: a kernel imported by no `src/**` file has no rendered flow
today, which is a **STRUCTURAL** park reason, never a silent default); **(v) THE FORK RE-VENDORS ALL
FIFTEEN** (`§5.6.5`).

**THE ONE HONEST LIMIT.** **Five of these fifteen rows describe an edge whose ONLY in-tree consumer is a
test harness** (`container.ts`, `layout-projection.ts`, `menu-template.ts`, `mount-invariant-guard.ts`,
and — as filed — `zones.ts`/`census.ts` are imported by no `src/**` file). **So for those rows the EDGE is
a CONTRACT obligation ahead of a consumer, and its `[T]`-layer evidence is the module's own suite — NEVER
a claim that the assembled app reads a store through them.** **`RCA-12` binds: a node-green on a module
no `src/**` file imports is envelope-green and nothing more.**

### §5.3 `E10-SINGLE-SINK-CHANNEL` and the one-clamp / one-writer disciplines

**THE LANDED ROWS.** `docs/decisions.md` `E10-SINGLE-SINK-CHANNEL` (cited by row name): *"the composition's
single sink writer is `E3`'s `commit` seam; the SESSION's `commit` option is a NON-FORWARDING recorder (or
absent), and giving the same function to both channels is a TWO-WRITER composition that FAILS."* Its
observable form (quoted in full in `docs/FORKER.md` `§4`'s seam block, read this pass): *"on the ruled
wiring, a VALID `end` reads `1` on the sink's own record AND `1` on `E3`'s `stats().sinkCalls` (they
AGREE); … a `cancel`/`pointercancel` reads `0`."* Beside it: the **one clamp site** (`S-PURE-4`) and the
**one managed write route** (`§2.3` row 15's *"a write that ADDS, REMOVES or MOVES the affordance's own
node … would still change the element"* — the reason the sink targets the authored STATUS node).

**WHAT THE PLAN WOULD CHANGE.** Two additions into the same gesture: a **per-move temp write** and a
**tier-1 commit at the terminal**. **The plan's constraints, which keep the landed counts EXACTLY as they
are:**
- **SINK-1 — the per-move temp write NEVER touches the sink.** It rides the wiring's subscriber and the
  consumer's preview channel (`§4` FLAG-2). `stats().sinkCalls` stays `1`/`0` per the terminal table.
- **SINK-2 — the tier-1 commit rides INSIDE the single sink invocation**, as a second effect of the same
  call. **The sink is invoked once; the store is committed once; the two counts agree at `1`** — which is
  the agreement `E10-SINGLE-SINK-CHANNEL`'s own reading clause is built on.
- **SINK-3 — the store never writes the graph** (`§4` FLAG-4). The graph patch stays the one managed
  `state-slice` write.
- **SINK-4 — the clamp is not moved, wrapped or duplicated:** `clampToBounds` remains the single site, and
  a second clamp inside a seam wrapper or a reset path stays inadmissible (`S-PURE-4`).
- **SINK-5 — the session's `commit` option stays a non-forwarding recorder** (`src/renderer/renderer.ts`
  `commit: () => undefined`, read this pass `:59-64`, `[H]`). **A store that hands its commit to the
  session's channel as well FAILS the landed row.**

**CLASSIFICATION: COMPATIBLE ADDITION, conditional on SINK-1..5 being pinned as rows in the store's own
contract and in the drag unit's register.** **A plan variant that commits per move, or that subscribes the
session to the store, is NOT a variant of this plan — it is a SUPERSESSION of `E10-SINGLE-SINK-CHANNEL` and
routes to the architect as such.**

### §5.4 The frozen gesture-session delegate surface

**THE LANDED ROWS.** `docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`: `docs/specs/
gsession.md` `§2.5`'s **eleven numbered items** are *"the ONE signature list `U-GUTTER` (`E3`) and
`U-RELOCATE` (`E4`) write their specs against, and it is **FROZEN AND COMPLETE**"*. **`§2.5`'s own closing
paragraph, read this pass, is the fence:** *"Nothing else exists. There is **no** `commit()` method on the
session, no `setPointerCapture`/`releasePointerCapture` method, … **no** value getter that computes, **no**
promise, **no** subscription, **no** store, and **no** options object that could smuggle a census, a
selector, a default or a policy predicate in."*

**WHAT THE PLAN WOULD CHANGE — AND WHAT IT WOULD *NOT*.** **The plan needs no session member at all**: the
listener is registered by the **wiring** on the **store**, and it observes a **store reference**, not the
session. The per-move write is performed by the **affordance's own move turn** (the module's own listener,
`docs/specs/gutter-ui.md` `§2.3` row 8) — a host-side call site that exists today. **So the answer to "does
the store need a subscription on the frozen session?" is NO — and that is a design constraint, not a
convenience.**

**THE ONE VARIANT THAT WOULD REQUIRE A FROZEN-CONTRACT CHANGE, COSTED SO IT IS NOT REACHED FOR LIGHTLY.**
**A session-level change channel** (`session.subscribe(...)`, a `onChange` hook on `install`, or a store
parameter) would give the store a **first-class gesture event feed** — and it would be **a frozen-contract
change** (`E3`/`E4` are `DONE` and the surface is frozen), needing **its own gate, an amendment to
`docs/specs/gsession.md` `§2.5`, and a red-first row** — the same price the repo already charges for the
`capturePointer?` opt-in (the `E3-CAPTURE-OPT-IN-IS-STILL-OWED` row's **ADOPT** option, costed at
`docs/decisions.md`, cited by row name). **RECOMMENDATION: do NOT take it (`§9` Q-8). The store's listener
surface is host-side, and the session's job is the lifecycle — collapsing the two is the second-authority
class the frozen surface exists to prevent.**

**⟶ ANSWERED 2026-10-01 (`Q-8`): READING (i) IS THE DECISION — NO SESSION-LEVEL CHANGE CHANNEL, AND NO
MEMBER IS ADDED TO THE FROZEN `§2.5` SURFACE.** **What that means, in four clauses a unit can FAIL on:**
**(1) the session READS AND WRITES STORE VALUES exactly as any other caller does — through the store's
own `read`/`set`/`commit`/`subscribe` — and it gains NO store parameter, NO store member and NO store
import.** **(2) THE PARADIGM'S READ SIDE IS THE STORE'S OWN `subscribe`, not a session event feed: a
consumer that wants to observe a gesture-affected value subscribes to the REFERENCE, not to the session.**
**(3) THE WRITE SIDE IS THE AFFORDANCE'S OWN MOVE TURN** (`docs/specs/gutter-ui.md` `§2.3` row 8) and the
composition's single sink (`E10-SINGLE-SINK-CHANNEL`, `SINK-1`..`5`), **unchanged.** **(4) `docs/specs/
gsession.md` `§2.5` IS NOT AMENDED, NOT ANNOTATED AND NOT ROUTED — the frozen list keeps its eleven
items byte-for-byte, and this plan's own `§5.9` row 16 is settled on its reading (i) side.**
**THE REASON, RECORDED AS A DECISION WITH ITS FROZEN-SURFACE REASON (it is the strongest kind of reason —
a landed contract, not a preference): the fence's own words are *"Nothing else exists. There is no …
subscription, no store"*, and a session-level channel would make the store a SECOND AUTHORITY over the
gesture lifecycle — the `A-3`/`S-11` class the frozen surface exists to prevent.** **The
`capturePointer?` opt-in's price (`E3-CAPTURE-OPT-IN-IS-STILL-OWED…`, its ADOPT arm) is the precedent for
what a frozen-surface change costs; this plan does not pay it, and a later pass that wants the channel
pays it in its own gate.** **A `session.subscribe`-shaped member appearing in any unit of `§6.5` is a
FINDING.**

**CLASSIFICATION: COMPATIBLE ADDITION.**

### §5.5 `docs/specs/mcp-endpoint.md`'s parity rules

**THE LANDED RULES (read this pass at the sections named).** `§5`'s process layout and *"All payloads are
JSON-safe (structured-clone)"*; **`P-E1`** (no package edit); **`P-E2`** (graph-canon, fragment-is-a-view);
**`P-E3`** (*"Two transports, one tool surface"*); **`P-E4`** (engine-owned idempotence); **`P-E5`** (flush
before response); **`P-E6`** (JSON-safe boundary); **`P-E8`** (`data-node-id` opt-in); `§6.4` (**the
settings surface is manual-UI-only by construction**); `§3.7` (the resources and their gate);
`§8` (the stdio-only push); `§4.1` (what is deliberately **not** bridged: *"No Node object, no `fs`, no
`require`, no `process`, no Electron module"*). **Plus `docs/specs/mcp-server-gate.md`**: the registration
and live re-gate rules (`M1`/`M2` in `docs/decisions.md`).

**WHAT THE PLAN WOULD CHANGE — FIVE CONSTRAINTS, ALL CHECKABLE.**
- **PAR-1 — NO NEW TOOL, RESOURCE, GROUP, METHOD OR NOTIFY MEMBER.** The five-seam sweep
  (`ALL_TOOLS`, `RpcMethod`, `VALID_GROUPS`, `MUTATING_METHODS`, and the IPC method set) is asserted **by
  set equality against the names**, never by a count (`docs/specs/zones.md` `§3.4` `R-6`'s five-seam
  negative `A-11`).
- **PAR-2 — `secure.*` IS UNREACHABLE FROM EVERY TOOL AND RESOURCE** (`§6.4`, layer 1 `§5` `A-7`), and the
  generic read refuses it (`§1.3` R-4).
- **PAR-3 — THE COMMIT CROSSING IS JSON-SAFE** (`P-E6`): X-2 carries **values and receipts**, never a
  store object, never a live engine object, never a function. **`§1.2`'s `cache` reference therefore never
  crosses** — a crossing that carried it would fail `P-E6`, not merely be untidy.
- **PAR-4 — THE TRANSPORT PARITY IS TRIVIALLY PRESERVED AND MUST BE ASSERTED**: `P-E3` holds because the
  model adds no surface, and **a store reachable on one transport only is a FAIL**.
- **PAR-5 — THE PUSH CHANGES NOTHING**: the store must not emit `notifications/resources/updated`; the
  notify path stays keyed on `MUTATING_METHODS` (`src/renderer/renderer.ts` `:232-234`, read this pass,
  `[H]`) and **the store is not in that set.**

**CLASSIFICATION: COMPATIBLE ADDITION.** **A variant that exposes a store over MCP is A NEW CONTRACT WITH
ITS OWN GATE** (and for `secure.*`, a refusal — not a contract).

### §5.6 The fork's re-vendor cost — **ACCEPTED, RETRACTED AND ITEMIZED** (the draft's "avoidable" answer is WITHDRAWN)

**THE DRAFT'S ANSWER, RETRACTED IN THOSE WORDS.** An earlier draft of this section answered *"YES — the
four stores can live wholly in `src/main/**` + `src/renderer/**` … so no vendored mechanism module moves"*
and treated **"host-side only"** as a **first-class design constraint**. **THE ARCHITECT HAS CHOSEN THE
SHARED-MODULE ROUTE** (SUPERSEDING STEER (A)) **and the fork's re-vendor cost is ACCEPTED** (STEER (B)).
**So: (i) the *"avoidable"* answer is WITHDRAWN and must not be quoted; (ii) "host-side only" is NO LONGER a
design constraint; (iii) the pin MOVES, and this section itemizes by how much.** **The one clause of the
draft's answer that is NOT retracted is a FACT rather than a design choice: `src/shared/types.ts` may now
be edited** — the channel carve-out the draft built around it is moot, and the constants may live wherever
the project's convention puts them (`§2.4` option (b) becomes admissible; `§9` Q-3 is updated to say so).

#### §5.6.1 — Which modules move (the verdicts of §5.2.3)

| # | The module (`src/shared/…`) | Its verdict (`§5.2.3`) | Does its byte MOVE? | What the fork must re-do for it |
| --- | --- | --- | --- | --- |
| 1 | `zones.ts` | `NO EDGE` | **NO** | nothing — its digest holds; **but the ROW that governs it changes wording** (`§5.9` row 6), so the fork's *conformance leg* (which asserts the no-store negative) must be re-pointed, not re-digested |
| 2 | `census.ts` | `NO EDGE` | **NO** | nothing to re-digest; **its `A-19` probe gains a fifth question** (`§5.9` row 13) → the fork's own probe text is its own pass |
| 3 | `gutter.ts` | `EDGE-READ` | **YES** | re-digest + re-run its test file + re-grade its register (`P-9` re-worded, the store read added) |
| 4 | `relocate.ts` | `EDGE-READ` | **YES** | re-digest + re-run + re-grade |
| 5 | `container.ts` | `NO EDGE` | **NO** | nothing to re-digest; **its `P-CT-1` extension binds the STORE, not this module** (`§5.9` row 11) |
| 6 | `gesture-session.ts` | `NO EDGE` (frozen; the channel is a `NEW CONTRACT` the plan does not take) | **NO** | nothing — **and this is the single most valuable "no move" in the table: the FROZEN surface is untouched, so the fork's frozen-pair conformance (`gesture-session.ts` + its test) stays valid** |
| 7 | `menu-template.ts` | `EDGE-READ` (latent) | **YES (latent)** | re-digest when the dependency becomes live; **until a menu consumer ships, the edge is declared-but-unexercised and the fork may defer** (`F-11`) |
| 8 | `layout-projection.ts` | `NO EDGE` | **NO** | nothing |
| 9 | `owned-list-host.ts` | `EDGE-READ+WRITE` | **YES** | re-digest + re-run + re-grade |
| 10 | `slot-host.ts` | `EDGE-READ+WRITE` | **YES** | re-digest + re-run + re-grade; **plus the new negative row that the store is not a container source** (`§5.9` row 23) |
| 11 | `overlay.ts` | `EDGE-READ+WRITE` | **YES** | re-digest + re-run + re-grade |
| 12 | `theme.ts` | `EDGE-READ` | **YES** | re-digest + re-run + re-grade; **its `P-TC-IM-5`-family boundary row is superseded** (`§5.9` row 21), so the fork's *"this repo owns no UI-config store"* reading of this module dies |
| 13 | `focus-model.ts` | `EDGE-READ+WRITE` **via its existing `persist` seam** | **NO byte change required by the plan — UNLESS the module itself must read the seam** (`§9` Q-13) | re-run its rows (the `persist` seam's target changes semantics: caller-called → store-backed) |
| 14 | `mount-invariant-guard.ts` | `NO EDGE` | **NO** | nothing |
| 15 | `gutter-affordance.ts` | `NO EDGE` (the wiring moves) | **NO** | nothing to re-digest; **the HOST files that drive it move** (below) |
| — | **`types.ts`** | not a mechanism (constants/types) | **YES if the channel constants land there** (`§2.4` option (b)) | re-digest — **and the draft's carve-out is withdrawn** (`§5.6`'s retraction) |
| — | **`demo-envelope.ts`** | authored UI data (**must NOT become a store tenant** — `§3.5` row 2.5-1) | **NO** | nothing |
| — | **`dom-shim.ts`** | `[X]` harness — **OUT OF SCOPE** (`§5.2.2` item 4) | **NO** | nothing |
| — | **`path-fork-cycle.ts`** | a battery fixture | **NO** | nothing |

#### §5.6.2 — Which host files move (they are src/** too)` too).** **`src/main/main.ts`** (the tier-1 path, the
timeout injection, the window geometry, the security handlers) · **`src/main/preload.ts`** (the store's
exposed functions and/or the new channel constants) · **`src/main/security-store.ts`** (the atomic write +
the receipt) · **`src/main/mcp-server.ts`** (only if the timeout injection site is threaded — a **one-line**
constructor-options pass, and the option members already exist) · **`src/renderer/renderer.ts`** (the drag
wiring, the focus holder, the theme seed/mirror) · plus the **new** store modules.

#### §5.6.3 — What the fork must re-digest and re-run
**(1) RE-DIGEST:** **eight** mechanism modules whose bytes move (`gutter`, `relocate`, `menu-template`
(latent), `owned-list-host`, `slot-host`, `overlay`, `theme`, and — if the constants land there —
`types.ts`) + the host files of §5.6.2 + the new store modules. **Seven** mechanism modules hold their
digest (`zones`, `census`, `container`, `gesture-session`, `layout-projection`, `mount-invariant-guard`,
`gutter-affordance`). **(2) RE-RUN:** the moved modules' own test files and register tables; the fork's
**conformance leg** (which compares shim ≡ real Electron on the pinned structural properties, **N = 9**
per `docs/FORKER.md` §6 — a leg that reads the built tree, so its precondition is a rebuild); the fork's
**census rows** if any of them count `ALL_TOOLS`/`RpcMethod`/`VALID_GROUPS`/`MUTATING_METHODS` (**the plan
adds no member — `§5.5` `PAR-1` — so those rows hold, and the fork should assert them BY NAME-SET
EQUALITY, the `H-r18` rule `docs/FORKER.md` §3 states**). **(3) RE-DECIDE:** the fork's **own carrier
question** — the `### PERSISTENCE` recipe (`docs/FORKER.md` §4 (iii): the returned-write seam, atomic
replace, version-from-first-write) was written **for the fork**; under this model **the foundation ships a
store**, so the fork's recipe must be re-read against the foundation's tier-1 file rather than only against
its own (or the fork may keep both, and say which). **(4) RE-VENDOR THE STORE ITSELF:** the stores are
**new foundation surface the fork must decide about** — adopt, or keep its own (a decision, not a default).

#### §5.6.4 — Where the obligation is recorded (named, and OWED)

**(a) `docs/FORKER.md`** — its **`§1`** table (*"Ships in the
fork: `src/`"*) stays true; its **`§4` `### PERSISTENCE — WHAT A FORK OWNS`** block must be **re-written**
(it currently states the foundation ships no generic store — `§5.9` row 19); its **`§3` count block**
needs no change (`PAR-1`); its **unit table**'s per-unit *"what a fork gets"* cells for the eight moving
modules need a **store-dependency line**; and its **seam blocks** (the `E10` eleven seams, the `E4` seven
seams) need a line saying their **implementations** are now store-backed while **the seam lists are
unchanged** (`§5.9` row 24). **(b) `docs/pending.md`'s fork-request region** (`## UPSTREAM REQUESTS FROM
FORKS — DISPOSITIONS`, the `§M`/`§N`/`§O` rows) — the `ZONE-GESTURE-PREVIEW-AND-COLLAPSED-DROP-TARGET`
disposition (`§O`, 2026-10-01) needs its **parking annotation** (`§5.9` row 26) and the **new store-value
answers** it now points at (`§1.6`). **(c) `docs/decisions.md`** — the supersession/parking rows of `§5.9`
(19, 20, 21, 26) land there, by the architect. **(d) AND ONE THING THE FORK'S OWN TREE OWNS:** the fork
annotates **its own** rows and writes **no** file of ours — this repo writes **no** file under the fork's
tree (`H-r6`'s return convention, `docs/FORKER.md` `§4`, read this pass).

**CLASSIFICATION: A SUPERSESSION'S CONSEQUENCE, NOT A RISK** — the re-vendor is now a **scheduled
obligation with a module list, a digest list, a re-run list and four named recording sites**, and **the one
number the fork needs from this repo is the list itself** (`§5.6.1`), which is exact.

#### §5.6.5 — THE ANSWERED RE-VENDOR LIST (`Q-13` + the constants answer, 2026-10-01): **ALL FIFTEEN MODULES MOVE**

**WHAT CHANGED FROM `§5.6.1`'s TABLE.** **`§5.6.1` recorded EIGHT moving mechanism modules and SEVEN
holding their digest. Under the answered scope (`§5.2.6`) EVERY ONE OF THE FIFTEEN GAINS AN EDGE, so the
arithmetic moves — and the honest form is to print it with its terms rather than restate the old list:**

| | Count | Which |
| --- | --- | --- |
| **MECHANISM MODULES WHOSE BYTES MOVE** | **15 of 15** | `zones` · `census` · `gutter` · `relocate` · `container` · `gesture-session` · `menu-template` · `layout-projection` · `owned-list-host` · `slot-host` · `overlay` · `theme` · `focus-model` · `mount-invariant-guard` · `gutter-affordance` — **with one declared qualification per module, below** |
| **MECHANISM MODULES HOLDING THEIR DIGEST** | **0** | **`§5.6.1`'s *"seven hold their digest"* is SUPERSEDED; the as-filed list is kept visible there** |
| **HOST FILES MOVING** | **5 + the new store modules** | `main.ts` · `preload.ts` · `security-store.ts` · `mcp-server.ts` (a one-line options pass) · `renderer.ts`; **plus the new store/channel modules** |
| **`types.ts`** | **DOES NOT MOVE** | **the constants answer is `§2.4` option (a) — a HOST-SIDE file shared by `main` and the preload (`src/main/store-channels.ts`, PROPOSED) — so NO vendored byte moves for the channel constants, and `§5.6.1`'s row for `types.ts` reverts to *"nothing to re-digest"*** |
| **`demo-envelope.ts` · `dom-shim.ts` · `path-fork-cycle.ts`** | **DO NOT MOVE** (unchanged) | authored UI data (and the `§1.7` authored pages are ADDED to it — **a fork re-authors them**); `[X]` harness out of scope; a battery fixture |

**THE FIVE QUALIFICATIONS THAT KEEP THE `15 of 15` HONEST — because four of the fifteen do NOT need a
byte change for their edge, and one is latent.** **(1) `gesture-session.ts` — NO byte change**: its edge
arrives at the COMPOSITION boundary (`Q-8`), so the module's own bytes and its frozen-pair conformance
stay valid, **and it is the single most valuable "no byte" in the list**. **(2) `focus-model.ts` — NO byte
change**: its `persist` seam already exists (it is a caller-called top-level export). **(3)
`gutter-affordance.ts` — NO byte change**: its seams are already the caller's; **the HOST files that drive
it move**. **(4) `mount-invariant-guard.ts` and `layout-projection.ts` — the edge lands in the CALLER/the
injected sink**, so **their own bytes may not move either**; **their CONTRACTS and registers do.** **(5)
`menu-template.ts` — LATENT**: imported by no `src/**` file, so the fork **may defer** it until a menu
consumer ships (`F-11`). **SO THE HONEST FIGURE IS: FIFTEEN MODULES GAIN AN EDGE; TEN OF THEM NEED THEIR
BYTES TO MOVE (the as-filed eight plus `zones.ts` and `census.ts`), FIVE GAIN THE EDGE WITHOUT A BYTE
CHANGE (`gesture-session`, `focus-model`, `gutter-affordance`, `mount-invariant-guard`,
`layout-projection`, with `menu-template` deferred by latency).** **A pass that quotes *"all fifteen
modules' bytes move"* is over-reading this section: the EDGE set is fifteen, the BYTE set is ten.**

**WHAT THE FORK STILL MUST RE-RUN, RE-DECIDE AND RE-RECORD — `§5.6.3` AND `§5.6.4` UNCHANGED, WITH ONE
ADDITION.** **(i) RE-RUN:** the ten moving modules' own test files and register tables · the fork's
conformance leg (`N = 9`; a leg that reads the built tree, so the precondition is a rebuild) · the census
rows **by NAME-SET EQUALITY** (the plan adds no MCP member — `§5.5` `PAR-1`). **(ii) RE-DECIDE:** the
fork's own carrier question, **and now the bigger one — whether to ADOPT this repo's store facility or
keep its own carrier** (`§5.1`'s supersession makes the facility real; the fork's own decision, either
way). **(iii) RE-RECORD:** the four sites `§5.6.4` names, **all OWED to `Q-14`'s one documentation pass
after `U-STORE-MODULES` lands**. **(iv) THE ADDITION THIS PASS CREATES:** the **`§1.7` authored surfaces
(landing + error pages) and the tab slice's references are NEW AUTHORED DATA a fork inherits or
re-authors** — so a fork adopting the slice must decide whether the landing/error pages are its own
authored nodes; **this is recorded as an OBLIGATION, not as a promise** (`§6.5`).

**CLASSIFICATION: A SUPERSESSION'S CONSEQUENCE, NOT A RISK — RE-STATED WITH THE BIGGER NUMBER.** **The
re-vendor is a scheduled obligation with a module list, an edge list, a byte list, a re-run list and four
named recording sites.** **What grew is the EDGE list (15) and the byte list (10); what did NOT grow is
the MCP surface (`PAR-1`), the frozen session (`Q-8`) and the vendored constants file (`Q-3`'s
answer).**

### §5.7 The panes/zones family rulings (`SHELL-CHROME-PANES-ZONES-IN-SCOPE`, `ZONE-SIZE-DOMAIN-…`, `U-RELOCATE-…`, `E5-B-2`)

**THE LANDED ROWS (all cited by name, all read at their own rows).** `SHELL-CHROME-PANES-ZONES-IN-SCOPE`
(A-d4: the five units, **and the mandatory clause that *"the geometry this family produces is UNPROVABLE in
this repo today"* must appear wherever geometry criteria are described**); `ZONE-SIZE-DOMAIN-IS-CONSUMER-
CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE` (2026-10-01: the readable domain is **`{min … max} ∪
{minimized}`**, a below-minimum attempt resolves to the minimum **or to zero**, **`0` is the MINIMIZE VERB
and never a smaller width**, a minimized member **retains its location** so proximity can expand it back,
**the family may supply the pure minimum clamp and RECEIVE the minimum and the slot key / the
caller-measured distance**, and **the MEANING OF ZERO and the MEASURE OF THE LOCATION stay consumer-side**);
`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` (three channels: the zone's expansion once per
gesture at the committing terminal, the ghost per-move, the reset arm) and `U-RELOCATE-REVEALED-ZONE-HIDES-
AGAIN`; `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE` (no parameter through which a
`clientX`/`clientY`/`getBoundingClientRect`/element reach could arrive).

**WHAT THE PLAN WOULD CHANGE — FOUR CONSTRAINTS.**
- **FAM-1 — THE STORE IS A CARRIER, NOT A POLICY.** It holds **received** values (a minimum, a slot key, a
  caller-measured distance, a clamped size) and **implements no mapping**: **`0 ⇒ minimized` stays the
  consumer's `census` + `revealed` predicate** (`ZONE-SIZE-DOMAIN-…` clause 4; layer 1 `§6.2`'s derivation
  read in full).
- **FAM-2 — NO SECOND CLAMP, NO SECOND COMPARATOR.** The store compares nothing and clamps nothing;
  `clampToBounds` and `withinProximity` stay the family's only arithmetic.
- **FAM-3 — NO MIRROR-CLASS VOCABULARY IN THE STORE'S NAMES OR BYTES** (`§1.3` R-1). **This is a real risk
  the plan names: the architect's own example name (`temp.leftSidebar.width`) is a *caller's* word and is
  fine; a store that shipped `temp.zone.z3.is-minimized` would reintroduce the banned taxonomy under a new
  name** — the `H-r15` hazard, stated in `docs/FORKER.md` `§4` block (iv) as *"a `0px` track is the whole
  TOKEN it emits — never a box claim"*.
- **FAM-4 — THE GEOMETRY CLAUSE CARRIES.** Any row this plan's units author that touches a rendered size
  must carry the mandatory clause verbatim, and **no `[T]` green may be reported as a rendered-geometry
  claim** (`docs/specs/zones.md` `§3.3` `I-10`, `§3.4` `R-7`, `§4.4` `S-6`).

- **FAM-5 — NO COORDINATE REACHES A SHARED MODULE THROUGH THE STORE.** The store carries **a clamped value
  and opaque caller keys**; **a pointer position, a rect, an element or a `getBoundingClientRect` answer may
  never become a reference's value** (`§1.3` R-5; `E5-B-2`'s no-reach clause; `container.md` `§3.4` `R-6`;
  `zones.md` `§3.3` `I-8`/`I-10`; `S-d11`).
- **FAM-6 — THE REVEAL AND THE GHOST ARE NOT STORE CHANNELS.** A subscriber may **drive** them, but **the
  reveal's once-per-gesture-at-the-terminal timing and the ghost's per-move timing are the landed rule**
  (`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`; `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`) — **a store
  whose event fires the reveal per move SUPERSEDES that ruled timing and is refused here.**

**CLASSIFICATION: COMPATIBLE ADDITION**, with one dependency named: **A-2's family-side half is a
SEPARATELY-GATED unit the architect has already admitted and not filed** (`ZONE-SIZE-DOMAIN-…` clause 5:
*"THIS row opens that gate and moves nothing by itself; the ledger stays `21 DONE / 0 open` and `RCA-8(f)`
admits no successor row until that unit's own record lands"*).

### §5.8 The ledger's closure and `RCA-8(f)` — a process conflict the plan cannot resolve on its own

**THE LANDED FACT.** `docs/next-steps.md`'s live ledger reads **`21 DONE / 0 open` UNITS = `21` units**,
**the open set is EMPTY**, and the rule is explicit: **`RCA-8(f)` admits no successor row — a new unit
exists only by the architect's admission** (`docs/next-steps.md`'s closure block, and `docs/pending.md`
`§P`'s closing paragraph, both read this pass). **`docs/decisions.md` `AUTONOMY AFTER SPEC APPROVAL`
(`AGENTS.md` item 10a)** permits the orchestrator to run the whole chain **after the spec gate** — but it
does **not** admit a unit, and it says so (*"the spec gate is the one approval the chain waits for"*).

**WHAT THE PLAN WOULD CHANGE.** `§6` proposes **six units**. **Every one of them is a NEW LEDGER ROW and
therefore needs the architect's admission BEFORE its spec gate** — the plan's units are **proposals, not
admissions**, and **the plan files no ledger row**. **CLASSIFICATION: A NEW CONTRACT WITH ITS OWN GATE, PLUS
AN ADMISSION THE ARCHITECT MUST GRANT.** **Stop-and-ask point 1 (`§6.4`).**

---

### §5.9 THE LANDED ROWS THIS SUPERSEDES — one row each, classified, with its cost

**THE METHOD, STATED BEFORE THE TABLE SO NOTHING IS LAUNDERED.** The architect's shared-module ruling
(**`§5.2`**) has a **general form** (*the shared surface may hold store dependencies*) and a **per-module
incidence** (*which modules actually gain one* — `§5.2.3`). **Every row below is classified TWICE: the
status of its GENERAL RULE (superseded / new contract / compatible addition) and whether the row is
TRIGGERED for its own module.** **A row that could not be classified is a finding, and this plan has ONE:
`§9` Q-13** (whether the architect intends every shared module to hold a store handle regardless of owned
data) — recorded as a finding rather than passed.

**THE COSTS ARE NAMED IN FIVE CURRENCIES, EACH AN ARTIFACT THIS REPO ALREADY KNOWS HOW TO PRODUCE:**
**CA** = a contract amendment (an anchored spec edit + a dated note, the annotate-never-rewrite convention) ·
**RG** = a register re-grain (the typed `§5.x` register's rows/terms/sums re-derived and re-executed — the
`E-3` precedent's *"the declared register terms become DRIVE counts"*, and the
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` rule) · **RS** = a red set (the TestWriter's rows for the new
behaviour, red first) · **LB** = the live battery (mandatory where the change reaches an assembled rendered
flow — `docs/specs/user-flow-audit.md` `§7.1` limb A/B) · **FV** = fork re-vendor (`§5.6`).

| # | The landed row / clause | Classification | What supersedes or changes it | Triggered for its own module? | Cost |
| --- | --- | --- | --- | --- | --- |
| **1** | **`gutter.md` `§2.2` `P-9`** — *"No sibling import — not even type-only — other than the session this unit composes"* (read at that row) | **SUPERSESSION (architect-only)** | The ruling admits a store dependency into the shared surface, so the row's **absolute** form cannot stand. **The narrower clause the ruling does NOT touch: the module still may not import a SIBLING MECHANISM** (a cross-mechanism edge stays a fabrication — the `H-r6` dissolved-edge class). So the row must be **re-worded** from *"no sibling import"* to *"no sibling-mechanism edge; a store edge is admitted"* | **YES** — `gutter.ts` gains `EDGE-READ` (`§5.2.3` row 3) | **CA + RG + RS + FV**. **Not LB** on its own (the rendered flow belongs to `E10`'s wiring) |
| **2** | **`gutter.md` `§2.2` `P-10`** — *"No census read of any kind"* (read at that row) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The row bans the module reading a **census**; the ruling lets it read the **store**. **A store read is not a census read only if the store is not a census** — so the row survives **verbatim** and gains a companion: *the store is not a census, and the module's store reads are values, not enumerations* | **PARTIAL** — `gutter.ts` reads `mem.layout.pane.<id>.size`/`.bounds`, **never a census object** | **CA** (the companion clause) + **RS** |
| **3** | **`zones.md` `§2.2` `P-1`** — *"No consumer vocabulary — no zone/pane/tab/region/dashboard name, no closed union member, no documented default, no documented constant, and no `'0px'`/`'fit-content'` literal"* (read at that row) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The store adds **no literal, no union and no default** to the module (`§1.3` R-1 keeps the store's own vocabulary empty). **The row is what makes `§1.3` R-1 enforceable, so it survives — and it now also binds the store's key grammar** (`§5.7` `FAM-3`) | **NO** — `zones.ts` gains `NO EDGE` | **0** (no change to the row); **the store's own contract carries the constraint** |
| **4** | **`zones.md` `§2.2` `P-2`** — *"No app UI content — no literal text, control, affordance, styling, or element the mechanism populates"* | **COMPATIBLE ADDITION — NOT SUPERSEDED** | A store dependency adds **no UI content**. Survives verbatim; the store's own contract must not become a styling channel | **NO** | **0** |
| **5** | **`zones.md` `§2.2` `P-3`** — *"No policy defaults — no decision the consumer owns, baked in as the mechanism's default"* | **COMPATIBLE ADDITION — NOT SUPERSEDED — AND THIS IS THE PLAN'S SHARPEST CONSTRAINT** | **A store whose `read` returns a default when a reference is missing WOULD BE this prohibition's violation, in a new place.** So the model's miss rule is not negotiable: **a miss returns `{found:false, value:undefined}` and never an invented default** (`§1.2`), and `ZQ-1` (`§1.6`) keeps the store out of size policy | **NO** | **CA** (the store's miss rule is a contract clause) + **RS** |
| **6** | **`zones.md` `§2.2` `P-4`** — *"No UI-config store and no persistence — no store of its own, no file, no `localStorage`"* (read at that row) | **SUPERSEDED IN ITS GENERAL FORM (architect-only); NOT TRIGGERED for this module** | The general form — the family-wide *"no store"* rule that `A-2` aggregates — is what the ruling supersedes. **For `zones.ts` itself the row still holds, because the module gains no edge** (it owns nothing) — so the row's **testable negative row stays green and the module's bytes do not move** | **NO** | **CA** (the general clause must be qualified in every spec that carries it — `zones`, `census`, `gutter`, `relocate`, `container`, `gsession`, `focus-model`, `overlay`, `theme`, `menulib`: **the ten contracts `A-2` enumerates**) + **RG** for the ten + **FV** for the ones that move |
| **7** | **`zones.md` `§2.2` `P-5`** — *"No new MCP surface — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry"* | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The store adds no MCP surface (`§5.5` `PAR-1`; `§2.3`). The row survives verbatim and is now **also the store's own five-seam negative** | **NO** | **0** (the store's contract repeats it as its own row) |
| **8** | **`zones.md` `§2.2` `P-6`** — *"No unverifiable criterion … no shim expansion"* | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The shim stays untouched (`§5.2.2` item 4). A store dependency adds **no shim member** and **no geometry claim** | **NO** | **0** |
| **9** | **`census.md` `§2.2` `P-1`** — *"No consumer vocabulary … no `'0px'`/`'fit-content'`/`'1fr'` literal"* (its `ADV-CN-5` amendment qualifies it to **closed-union** vocabulary) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | Same as row 3 | **NO** — `census.ts` gains `NO EDGE` | **0** |
| **10** | **`census.md` `§2.2` `P-3`** — *"No policy defaults — the four consumer decisions are the CALLER'S"* | **COMPATIBLE ADDITION — NOT SUPERSEDED** | Same as row 5: **the store may not become the fifth consumer decision.** `ZQ-3` (`§1.6`) keeps the `0 ⇒ minimized` mapping consumer-side | **NO** | **CA + RS** |
| **11** | **`container.md` `§2.2` `P-CT-1`** — *"No consumer vocabulary … INCLUDING the mirror-class taxonomy `H-r15` names"* | **COMPATIBLE ADDITION — NOT SUPERSEDED — AND IT NOW BINDS THE STORE'S GRAMMAR** | The store ships no `is-empty`/`is-minimized`/`is-revealed` literal and no pane/zone token (`§1.3` R-1; `§1.6` `ZQ-2`). **A store reference spelling `is-minimized` would resurrect `SCH-10` under a new name and FAIL this row** — so the row survives and is **extended to the store's bytes by the store's own contract** | **NO** — `container.ts` gains `NO EDGE` | **CA** (the extension is written into the store's contract) + **RS** (a scanner row over the store's source, the `container.md` `§3.4` `R-1` pattern, with a positive control) |
| **12** | **`container.md` `§2.2` `P-CT-13` / `I-2`** — the `B-3` working default (*"the caller's mapping carries NO `empty`/`is-minimized`/`is-revealed` member deciding emptiness/reveal/minimization, unless `U-CENSUS`/`U-ZONES` supply the value"*) and `I-2` (*"NO MEMBER OF `chrome` IS CONSULTED FOR ANY DECISION"*) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The store is **not** a `chrome` mapping and is not consulted by this module; **and `§1.6` `ZQ-2`/`ZQ-3` keep the emptiness/reveal decision where this row puts it.** **The one reading that would break it: a store-sourced emptiness member handed to `container` as `chrome`** — explicitly refused by `FAM-1`/`FAM-3` (`§5.7`) | **NO** | **CA + RS** (a negative row: a store-sourced `chrome` member FAILS, with a positive control) |
| **13** | **`census.md`'s `A-19` probe** — *"the `V-13` closure probe: reading the landed module, is there ANY second authority over emptiness or over tokens — a census read in this module, a token limb formatted here, a key set derived from anything other than `zones`, or a `revealed` policy? Any positive means the finding A-d4 says these rows ANSWER is not in fact answered"* (read at that row) | **COMPATIBLE ADDITION — NOT SUPERSEDED — AND IT GAINS A FOURTH QUESTION** | The probe's four questions are all about the **module's** behaviour and none is a store question. **Under the model the probe must be EXTENDED by one clause: *"or a store-sourced value consulted for the emptiness decision"*** — otherwise the probe becomes a partial closure claim | **NO** — but the probe's own text must move | **CA** (four questions become five) + **RG** (the probe is a register row in `census`'s `§5.5.1`) + **RS** |
| **14** | **the `V-13` class** — the second-authority validity finding, whose remedy A-d4 names as `U-ZONES`' delegation rows (`I-2`/`I-4`) | **COMPATIBLE ADDITION — NOT SUPERSEDED, AND RE-ASSERTED** | The class's *"no second authority over emptiness or over tokens"* rule is **unmoved**, and the plan's own `§7.3` `NW-2` is the same rule applied to the store. **The store must not become a second authority over emptiness, tokens, the element-id kind (`F-5`) or the gesture lifecycle** | **NO** | **CA** (the store's contract carries the three "must not cross" lines as rows) |
| **15** | **`S-d11`'s mandatory geometry clause** — *"the geometry the family produces is UNPROVABLE in this repo today"* (carried verbatim at `docs/specs/zones.md` `§0` ruling 6, `docs/specs/census.md` `§0` ruling 6, `docs/specs/projection.md` `§2.5`, `docs/specs/container.md` `R-6`) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | **A store makes geometry claims no more provable, and it must not become the place a coordinate finally lives.** `§1.3` R-5, `FAM-5` and `ZQ-4` keep the store to **clamped values and opaque caller keys**; the ONE coordinate read stays in the affordance's move turn (`[U]`) | **NO** | **CA** (the clause's mandatory wording must appear **wherever the store describes a size/placement criterion** — which includes the store's own contract) |
| **16** | **`gsession.md` `§2.5` + `docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** — the eleven numbered items; *"Nothing else exists. There is **no** … **no** subscription, **no** store, and **no** options object that could smuggle a census, a selector, a default or a policy predicate in"* (read at `§2.5`) | **COMPATIBLE ADDITION IF the paradigm lands at the COMPOSITION boundary; `NEW CONTRACT (own gate)` IF the architect wants the SESSION itself to emit change events** | **Reading (i) — preferred and taken by this plan:** the session is unchanged; the store's listeners are host-side and the per-move write rides the affordance's own move turn (`§5.2.3` row 6). **Reading (ii):** a `session.subscribe`/`onChange` member **supersedes the frozen surface** → its own gate, a `§2.5` amendment, a red-first row — the same price the repo charges for the `capturePointer?` opt-in (`E3-CAPTURE-OPT-IN-IS-STILL-OWED…`, its **ADOPT** option) | **NO under (i); YES under (ii)** | **(i) CA only** (the composition boundary's role named) · **(ii) CA + RG + RS + LB + FV** — **the plan does NOT take (ii)** (`§9` Q-8) |
| **17** | **`docs/decisions.md` `E10-SINGLE-SINK-CHANNEL`** — *"the composition's single sink writer is `E3`'s `commit` seam … giving the same function to both channels is a TWO-WRITER composition that FAILS"* | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The store rides **inside** the single sink invocation (one call, two effects) and **never** gets a second channel (`§5.3` `SINK-1`..`5`). **The counts stay `1`/`0` per the terminal table** | **YES** — `gutter.ts` and the wiring (`E10`) both touch this rule | **CA** (SINK-1..5 as contract rows) + **RS** (the two-reading comparison rows) + **LB** (`U-STORE-DRAG`; the drag's terminal is a rendered flow) |
| **18** | **`gutter.md` `§4.4` `S-PURE-4`** — the ONE clamp site (*"a second clamp site … is NOT admissible"*, as carried by `docs/FORKER.md` `§4` block (ii), read this pass) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | **`ZQ-1` (`§1.6`) is this rule applied to the store: the store refuses NAMES and TIERS, never SIZES** — so no store-side clamp is created, and `clampToBounds` stays the one site | **NO** (the store's refusal surface is where the risk would appear) | **CA** (the refusal domain is written as a contract row with a positive control) + **RS** |
| **19** | **`docs/decisions.md` `NO-FOUNDATION-CONFIG-FILE-FACILITY`** (its clause 1: *"persistence is CONSUMER-side"*) | **SUPERSEDED — ARCHITECT-ONLY, under EITHER reading, and the facility question is now SHARPER** | **The shared-module ruling removes the last route by which the facility could be described as "host-side only": the store is now a MECHANISM-LEVEL dependency**, so the row's subject (a foundation-owned generic persisted facility) is squarely implicated. **The two readings of `§5.1` remain both live and both architect-only; the plan takes neither** | **n/a — a decision row** | **CA** (the row moves to `SUPERSEDED` with its replacement named, or a NEW ACTIVE row records the opened gate) + **FV** (the fork-facing `### PERSISTENCE` block must be re-written — `docs/FORKER.md` `§4`, an **existing file this pass may not modify**) |
| **20** | **layer 1 `§5` absence `A-2`** — *"No store, no persistence, and no ambient read in ANY `src/shared/` mechanism … a UI-config store or any persistence of its own (persisted state is supplied *to* the mechanism)"* (it aggregates ten contracts' testable negative rows) | **SUPERSEDED IN ITS GENERAL FORM (architect-only)** | This is the **aggregate** the ruling supersedes. **Its per-contract rows are rows 1–12 above, each with its own status — the aggregate must not be moved without them** (an aggregate moved alone would leave ten contradicted rows behind) | **the ten contracts `A-2` enumerates** | **CA ×10 + RG ×10 + FV for the moving ones** |
| **21** | **`theme-control.md` `P-TC-IM-5`** and **`docs/decisions.md` `THEME-MECHANISM-AND-AUTHORED-CONTROL`**'s persistence boundary (*"this repo owns no UI-config store; if it ever needs one that is a **new gate** that must not be smuggled in"*) | **SUPERSEDED (architect-only) FOR THE BOUNDARY; the authored-control half survives** | `theme.ts` now reads the appearance setting from tier 1 (`§5.2.3` row 12), so *"this repo owns no UI-config store"* is no longer true. **The other half — the control stays AUTHORED provident data and the mechanism writes nothing — is untouched** | **YES** — `theme.ts` gains `EDGE-READ`; `U-THEME-CONTROL`'s authored half does not move | **CA + RG + RS + FV** (the first moving FAMILY-unit byte change in this plan's scope) |
| **22** | **`focus-model.md`'s no-store row (`R-3`)** and **`focus-tool.md` `P-FT-4`** (the tool layer holds nothing) | **SUPERSEDED (architect-only) FOR `focus-model.md`'s row; `P-FT-4` SURVIVES** | The model's row is superseded by the `persist`-seam adoption (`§5.2.3` row 13 — and note it needs **no module byte change**, so the supersession is of the *wording*, not of the code). **`P-FT-4` (*"the tool layer holds NOTHING between calls"*) SURVIVES VERBATIM** — the tool is a thin adapter over the holder's answer, and the holder's carrier moving to tier 2 does not give the tool state | **YES for the model's row; NO for the tool** | **CA** (the model's row re-worded; the tool's spec gains a note that its own row is unmoved) + **RG** |
| **23** | **`SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`** (the container source stays an **injected** factory; the ambient read is deleted) | **COMPATIBLE ADDITION — NOT SUPERSEDED, AND THE PLAN NAMES THE ONE WAY IT COULD BE BROKEN** | `slot-host.ts` gains an `EDGE-READ+WRITE` for its **key→placement record** — **and the store must NOT become the container source.** A store-sourced container factory would resurrect the ambient-read evasion the architect already had deleted (`docs/FORKER.md` `§4`'s container-source block (vii), read this pass) | **YES** — `slot-host.ts` (`§5.2.3` row 10) | **CA + RS** (a negative row: the store is not a container source, with a positive control) + **FV** |
| **24** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** and **`E5-B-1`** (*the declaration is RETURNED as text and never applied*) | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The seam table stays the contract (`docs/FORKER.md` `§4`, read this pass) and the plan **back-fills the seam implementations with store reads** — it does not add, remove or re-sign a seam. **The declaration stays returned-and-never-applied** (`§5.2.3` row 11 keeps it that way for `overlay.ts`) | **YES** — the seam **implementations** move (host-side), not the seam list | **CA** (the store-backed implementations are documented per seam) + **FV** for the host files |
| **25** | **`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`** + **`U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`** | **COMPATIBLE ADDITION — NOT SUPERSEDED** | The three channels are preserved exactly (`§5.2.3` row 4): the reveal stays **once per gesture at the terminal**, the ghost **per move**, the reset arm by channel. **A store that revealed per move would supersede these rows — and the plan refuses that** (`FAM-6`) | **YES** — `relocate.ts` gains `EDGE-READ` | **CA + RS** (by-channel rows re-driven) + **LB** |
| **26** | **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** (its clause 5: a new unit is admitted for the family-side half; *"THIS row opens that gate and moves nothing by itself"*) | **SUPERSEDED IN ITS UNIT-ADMISSION CLAUSE (architect-only) — PARKED BY THE ARCHITECT'S OWN *"Park it — the ownership model supersedes it"*** | The admitted-but-unfiled unit **does not become a unit**: its questions are absorbed as `§1.6`'s `ZQ-1`..`ZQ-4`, and its **four consumer-side/substance clauses survive verbatim** (the domain, `0` = the minimize verb, the retained location, the layer split) | **n/a** | **CA** (the parking is recorded and the clause-5 admission is annotated, **not deleted** — the annotate-never-rewrite convention) + **CA** at `docs/pending.md` `§O` and the fork-facing block |

**THE TABLE'S HONEST SUMMARY, SO THE CLASSIFICATION IS NOT READ AS A LAUNDERING.** **`4` rows are
SUPERSEDED (architect-only) in a general form** (rows 6, 19, 20, 21, and — as a unit-admission clause — 26)
· **`1` row is a `NEW CONTRACT` only under the un-taken reading** (row 16's (ii); the plan takes its
compatible reading) · **`20` rows are COMPATIBLE ADDITIONS and stay literally intact** · **and `1`
classification is a FINDING rather than a verdict: whether the architect intends EVERY shared module to
hold a store handle regardless of owned data (`§9` Q-13)** — which changes five of `§5.2.3`'s fifteen
verdicts and therefore the fork arithmetic at `§5.6`. **The four supersessions all route to the architect
in this pass; none is taken by a spec, a unit or this plan.**

### §5.9.1 THE RE-CLASSIFICATION THE ANSWERED SCOPE FORCES (`Q-13`, 2026-10-01) — and the new tally, with its terms

**WHY THIS SUBSECTION IS OWED RATHER THAN OPTIONAL.** `§9` `Q-13`'s own cost cell stated it in advance:
*"under (b), `§5.9` rows 1–5's compatible classifications must be re-classified as supersessions, and the
`A-19` probe's extension becomes mandatory rather than prudent."* **The architect took (b) — all fifteen
adopt (`§5.2.6`) — so the re-classification is owed and is discharged here, one row at a time.**

| Row (`§5.9`) | As filed | **NOW** | What moved |
| --- | --- | --- | --- |
| **1** `gutter.md` `§2.2` `P-9` (no sibling import) | SUPERSESSION (architect-only) | **SUPERSESSION — strengthened** | the re-worded row now covers **every** shared module's store edge, not one module's |
| **2** `gutter.md` `§2.2` `P-10` (no census read) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — with its companion clause now MANDATORY** (the store is not a census; the module's store reads are values, not enumerations) | the companion was *advisory*; it is now a **row** |
| **3** `zones.md` `§2.2` `P-1` (no consumer vocabulary) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — unchanged, and now binds the STORE'S GRAMMAR through a module that carries an edge** | the row survives; **`zones.ts` is now a store consumer, so the scan row's scope widens to the module's store reads** |
| **4** `zones.md` `§2.2` `P-2` (no app UI content) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — unchanged** | — |
| **5** `zones.md` `§2.2` `P-3` (no policy defaults) | COMPATIBLE ADDITION — **the plan's sharpest constraint** | **COMPATIBLE ADDITION — unchanged and now LOAD-BEARING for `zones.ts`'s edge**: the store's miss rule (`§1.2`: `{found:false}` and **never an invented default**) is what keeps a store-reading kernel from becoming a policy default | the `CA` + `RS` cost stands; **the ambient-read row (`§1.7` item 10) is the new companion** |
| **6** `zones.md` `§2.2` `P-4` (no UI-config store, no persistence) | SUPERSEDED IN GENERAL FORM; **NOT TRIGGERED for this module** | **SUPERSEDED IN GENERAL FORM — AND NOW FULLY TRIGGERED FOR `zones.ts`** (`zones.ts` gains `EDGE-READ`, `§5.2.6` row 1): **the module's own no-store row must be RE-WORDED beside its as-filed bytes**, exactly as row 1's was | **a TRIGGER moved, not a classification**: the general supersession was already taken; the module-level incidence is new |
| **7** `zones.md` `§2.2` `P-5` (no new MCP surface) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — unchanged, and now the store's own five-seam negative repeated by five more modules' specs** | — |
| **8** `zones.md` `§2.2` `P-6` (no unverifiable criterion / no shim expansion) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — unchanged** | — |
| **9** `census.md` `§2.2` `P-1` (no consumer vocabulary) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — with the same widened scan scope as row 3** | — |
| **10** `census.md` `§2.2` `P-3` (no policy defaults) | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — now LOAD-BEARING for `census.ts`'s edge** (`§5.2.6` row 2), as row 5 is for `zones.ts` | — |
| **11** `container.md` `§2.2` `P-CT-1` (no mirror-class taxonomy) | COMPATIBLE ADDITION, **binds the store's grammar** | **COMPATIBLE ADDITION — and now MUST ALSO bind `container.ts`'s own store-sourced inputs** (`§5.2.6` row 5): the module may not consult a `chrome` member derived from store-sourced emptiness/reveal state | **the scan row's scope widens; the row's text does not** |
| **12** `container.md` `§2.2` `P-CT-13` / `I-2` | COMPATIBLE ADDITION (**the negative row: a store-sourced `chrome` member FAILS**) | **COMPATIBLE ADDITION — and the negative row is now MANDATORY, with its positive control** | the row's STATUS does not move; **its OBLIGATION becomes a register row** |
| **13** `census.md`'s `A-19` probe (the `V-13` closure; four questions) | COMPATIBLE ADDITION, gains a **fourth** question | **COMPATIBLE ADDITION — the fifth question is now MANDATORY, and the probe's own text MUST move** (*"or a store-sourced value consulted for the emptiness decision"*) | **prudent → mandatory**, exactly as `Q-13`'s cost cell predicted |
| **14** the `V-13` class | COMPATIBLE ADDITION, re-asserted | **COMPATIBLE ADDITION — unchanged, and now the rule the five new edges are measured against** (`§1.7` item 10) | — |
| **15** `S-d11`'s mandatory geometry clause | COMPATIBLE ADDITION | **COMPATIBLE ADDITION — unchanged**, and its mandatory wording must appear **wherever a store-read kernel describes a size/placement criterion** | — |
| **16**–**26** (the frozen session, the parity rules, the sink row, `S-PURE-4`, the facility row, `A-2`, the theme boundary, the focus rows, `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`, the caller seams, `U-RELOCATE-*`, the parked clause 5) | as filed (`§5.9`) | **UNCHANGED BY `Q-13`** — **two of them are separately ANSWERED elsewhere** and are named so the reader can find them: **row 16** is settled on its reading (i) side by **`Q-8`** (`§5.4`), and **row 19** (`NO-FOUNDATION-CONFIG-FILE-FACILITY`) is settled by **`Q-4`** (`§5.1`: supersession taken, new ACTIVE row landed), while **row 26**'s parking is confirmed by **`Q-12`** (`§1.6`) | — |

**WHAT THE RE-CLASSIFICATION IS *NOT*.** **No row's as-filed bytes are rewritten:** rows 1–15 keep their
text and gain a **dated status cell here** (`RCA-8(d)`). **The classification of a MODULE-INDEPENDENT
prohibition never moves** (rows 7/8/15): a store edge does not create consumer vocabulary, does not add
MCP surface and does not make geometry provable. **What moved is the TRIGGER (five more modules carry the
edge) and one OBLIGATION's strength (`A-19`'s fifth question, now mandatory).**

**THE RE-COUNTED TALLY, WITH ITS TERMS.** **As filed (`§5.9`'s summary): `4` superseded in a general form
(rows 6, 19, 20, 21, plus row 26 as a unit-admission clause) · `1` `NEW CONTRACT` only under the un-taken
reading (row 16) · `20` compatible additions · `1` classification a FINDING (`Q-13`).** **NOW, after
`Q-13` and the four other answers:**

| Class | NOW | Which |
| --- | --- | --- |
| **SUPERSEDED (architect-only), general form** | **5** | rows **6 · 19 · 20 · 21** + **row 26**'s unit-admission clause *(row 19's supersession is now LANDED as a decision row, `§5.1`)* |
| **SUPERSEDED-TRIGGERED at module level** | **+1** | **row 6 is now triggered for `zones.ts`** (`§5.2.6` row 1) — **a trigger, not a sixth supersession** |
| **`NEW CONTRACT` under the un-taken reading** | **1** | row 16's (ii) — **NOT TAKEN** (`Q-8`); the reading taken is compatible |
| **COMPATIBLE ADDITIONS** | **20** | **unchanged in count; three of them (`A-19`'s fifth question, row 2's companion, row 12's negative row) moved from advisory to MANDATORY** |
| **CLASSIFICATIONS THAT WERE FINDINGS** | **0** | **`Q-13` WAS THE PLAN'S ONE UNCLASSIFIED ROW AND IT IS ANSWERED** (`§5.2.6`) — **so the finding class is EMPTY, and the sweep `§10` owed (the unread `P-*`/`P-CT-*` rows of `census.md`/`container.md`/`gutter.md`) is still OWED and is named below** |
| **TOTAL ROWS IN THE TABLE** | **26** | `5 + 1 + 20 = 26` ✔ — **the identity closes over the table's own rows** |

**AND THE ONE GAP THIS PASS DOES NOT CLOSE, RESTATED BECAUSE IT IS A GAP AND NOT A FINDING.** **`§10`
recorded that `census.md`'s `P-2`/`P-4`/`P-5`…, `container.md`'s `P-CT-2`…`P-CT-12` and `gutter.md`'s
`P-1`…`P-8` were NOT READ by the filing pass, and that *"the gate-1 pass that rules `§5.9` must sweep the
remaining `P-*`/`P-CT-*` rows of those three tables and append them to the table."*** **THIS PASS DOES NOT
PERFORM THAT SWEEP** — it is a **documentation amendment** that folds in fourteen answers, **and a row
that would be affected but was not read remains `UNCLASSIFIED — NOT READ` rather than an inferred
verdict.** **The sweep stays owed to the gate-1 pass of whichever unit is admitted first**, and **the
honest form of `§5.9`'s coverage claim is unchanged: it is the supervisor's named rows plus the rows this
document could read at their own text.**

## §6. Migration and sequencing

### §6.1 What lands first, and why

**THE ORDER IS FORCED BY THREE FACTS, NONE OF THEM NEGOTIABLE.**
1. **The model is the thing the rest is written against** — every later unit's contract cites the read
   shape, the naming grammar, the clear rule and the listener surface. **A unit built before the core
   exists would invent its own shape and be re-graded.** So: **core first.**
2. **The file tier is the only tier that needs `main`, an IPC crossing and an atomic write** — it is the
   riskiest surface (a new channel, a new file, a new receipt) and it is a **precondition for every
   persistence claim** the later units make. So: **persistence second.**
3. **The one tenant that needs NOTHING from the others is the security tier** — its referent already
   exists, its file already exists, its writer already exists, and its only change is the atomic write +
   the receipt + the `secure.*` refusal. So: **it can run in parallel with the core** (it is the model's
   only independent unit).

### §6.2 The dependency graph

```
        (architect admission — §6.4 stop-and-ask 1)
                     │
      ┌──────────────┼───────────────────────────┐
      ▼              ▼                           ▼
 U-STORE-CORE   U-STORE-SECURITY          (independent of CORE)
      │              │
      ▼              │
 U-STORE-PERSIST ────┤  (needs CORE's read/commit/naming; SECURITY is independent)
      │
      ├──────────────► U-STORE-FOCUS      (needs CORE + PERSIST for hydration; independent of LAYOUT)
      │
      ▼
 U-STORE-LAYOUT    (the parked family-side clamp unit is NO LONGER a dependency — see §6.3/§6.4 item 5)
      │
      ▼
 U-STORE-DRAG   (+ the folded-in diagnostic replacement for `writes`)

 U-STORE-MODULES  (the SHARED-SURFACE adoption; needs CORE + PERSIST for the read/commit shape,
                   and it is the unit every MOVING shared module's amendment lands in — §5.2/§5.6)
```

**EVERY ARROW IS A CONTRACT DEPENDENCY, NOT A CONVENIENCE**: `PERSIST` cannot be written before `CORE`
defines the commit's receipt and the alias-declaration shape; `FOCUS` cannot be written before `PERSIST`
defines the hydration read (the focus holder's cap and lifetime must be tier-2 semantics, and the
hydration path decides what "tier 2 survives a reload" means); `DRAG` cannot be written before `LAYOUT`
defines what a placement reference *is*.

### §6.3 The unit split — boundary · contract · evidence layer · what it needs from the architect

**SIX UNITS. Each is a separate red→green→adversarial→greens→doc-review cycle with its own contract, its
own register and its own DONE row (`RCA-2`/`RCA-5`: never one inline run for two units).** **⟶ AMENDED 2026-10-01: THE LIVE SPLIT IS `§6.5` — the same six
ids, with the four newly-absorbed work items (`RH-1`, `RH-2`, `RH-3`, the TABS SLICE) distributed into
them and NO seventh unit added.** **The table below is the AS-FILED split and its boundaries stand except
where `§6.5` extends one; read them together, and read `§6.5` first for the evidence layers and the
stop-and-ask points.**

| Unit (proposed id) | Boundary (what it may touch) | Contract (new spec, proposed path) | Evidence layer | Needs from the architect |
| --- | --- | --- | --- | --- |
| **`U-STORE-CORE`** — the model itself: three non-security tiers, the layered read with its `{value, tier, cache, name}` shape, the naming grammar + declaration table, commit-clears-lower (C-1..C-5), the listener surface, `secure.*`'s refusal, the caps | **new host-side modules only** (**proposed `src/renderer/store-core.ts`**, **proposed `src/main/store-channels.ts`**), **plus zero edits to `src/shared/**`** | **`docs/specs/store-core.md`** (proposed) | **`[T]`** (the read's tier search, the clear rule, the refusal, the caps — all exhaustively enumerable over a fixed table set) + **`[H]`** (the wiring's own drives) | the admission; the reference-grammar ownership (`§9` Q-6); the event-count rule (`§9` Q-7); the process/realm split (`§9` Q-1) |
| **`U-STORE-PERSIST`** — tier 1: the file record + its atomic write, the tracked-file list, X-1 hydration, X-2 commit + receipt, X-3 push (declared no-op), the renderer mirror and its staleness row | **`src/main/**` + `src/renderer/**` + the new store modules; the preload's exposed functions** | **`docs/specs/store-persist.md`** (proposed) | **`[H]`** (the file's bytes, the receipt, the refusal) + **`[T]`** where a shim-hosted realm can drive the mirror | the tier-1 facility ruling (`§5.1`); the channel-home decision (`§9` Q-3) |
| **`U-STORE-SECURITY`** — tier 4: re-home the security settings into the tier vocabulary, the atomic write, the receipt (no swallow), the `secure.*` refusal, and the **unchanged** manual-UI-only discipline | **`src/main/security-store.ts` + `main.ts`'s handler sites + the store modules; NOT the gate's semantics, NOT the MCP surface** | **`docs/specs/store-security.md`** (proposed) | **`[H]`** (the file, the receipt, the gate's behaviour under a patch) — **and NO `[U]` row is needed** (no rendered surface changes) | whether the tier's access control extends to renderer reads (`§9` Q-2); the `F-6` disposition (`§7`) |
| **`U-STORE-FOCUS`** — the focus holder moves into tier 2 with a **declared cap**; the carrier amendment to `focus-tool.md` | **`src/renderer/renderer.ts`'s holder sites + the store modules; the `focus-tool.md` `§2.1` item 6 amendment** | **`docs/specs/store-focus.md`** (proposed) | **`[T]`** (the holder's lifetime under a graph `load`; the cap; the answer's shape) + **`[H]`** | whether a cap is admissible against *"the holder IS the live authority"* (`§9` Q-9 — the plan argues the authority is unchanged, the carrier is not) |
| **`U-STORE-LAYOUT`** — the working layout record (tier 2) + the committed layout and window geometry (tier 1) + the reveal/minimum references as **received** values | **`src/main/main.ts`'s window construction + the renderer wiring + the store modules; NOT any `src/shared/**` module** | **`docs/specs/store-layout.md`** (proposed) | **`[T]`** (the record's arithmetic — none: it stores what it is given) + **`[H]`** + **`[U]` MANDATORY** (a persisted layout restored across a boot is a rendered fact, `docs/specs/user-flow-audit.md` `§7.1` **limb B**, read this pass) | **the parked family-side clamp unit's questions are now THIS unit's (`§1.6` `ZQ-2`/`ZQ-3`/`ZQ-4`) — the dependency is GONE, the WORK is not**; whether window geometry is in scope |
| **`U-STORE-DRAG`** — the architect's drag example: the tier-3 episode, the per-move write through the **preview** channel, the single sink invocation's two effects, the terminal sweep, and **the folded-in replacement of `writes` by the bounded last-commit receipt** | **`src/renderer/renderer.ts`'s `startGutterAffordance` regions + the store modules** | **`docs/specs/store-drag.md`** (proposed) | **`[T]`** (the counts: 1 sink write, ≤1 preview write per move, 0 on cancel) + **`[H]`** + **`[U]` MANDATORY** (`§7.1` limb **A** *and* limb **B**: the ghost is a rendered surface whose truth is real-DOM-only) | the `E10`-class ruling this plan assumes (SINK-1..5 as rows); whether the session-side change channel is wanted (`§9` Q-8 — recommendation: no) |

| **`U-STORE-MODULES`** — **the SHARED-SURFACE adoption** (SUPERSEDING STEER (A)): the ten store edges of `§5.2.3`, the contract amendments of the twenty compatible rows, the wording supersession of the four general rows (`§5.9`), and the register re-grains each edge forces | **`src/shared/**` — the ten modules that gain an edge — plus the specs that carry the amended rows; NOT the package, NOT the shim, NOT the graph, NOT the MCP surface** | **`docs/specs/store-modules.md`** (proposed) | **`[T]`** (each module's own suite + its re-grained register) + **`[H]`** (the store-backed seams) + **`[U]` MANDATORY for any edge that reaches an assembled rendered flow** (`theme`, the list/slot hosts; `docs/specs/user-flow-audit.md` `§7.1` limb A/B) | **the scope ruling on the qualifier *"for owned data/settings"*** (`§9` Q-13 — **the plan's one unclassified row**); the admission; the re-vendor scheduling (`§9` Q-14) |

**WHAT CAN LAND WITHOUT A FROZEN-CONTRACT CHANGE, AND WHAT CANNOT.**

| | Units | Why |
| --- | --- | --- |
| **Landable with NO frozen-contract change** | `U-STORE-CORE`, `U-STORE-PERSIST`, `U-STORE-SECURITY`, `U-STORE-FOCUS`, `U-STORE-LAYOUT`, **`U-STORE-MODULES`** (its contract AMENDS shared-module specs and re-grades their registers — **an amendment, not a frozen-surface change**; `gesture-session.ts` is the ONE module whose edge would be a frozen-contract change, and the plan takes the compatible reading — `§5.9` row 16) | None of them touches `docs/specs/gsession.md` `§2.5`, `E3`'s controller surface, the family mechanisms, the MCP surface, or the gate's semantics. `FOCUS` **amends a spec clause** (`focus-tool.md` `§2.1` item 6, the holder's carrier) — **a spec amendment, not a frozen-surface change**, and it needs the architect's nod (`§9` Q-9) because the clause's own words are absolute about the holder. |
| **Cannot** | `U-STORE-DRAG`'s *optional* variant (a session-level change channel) | It is a **frozen-contract change** (`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`), needs its own gate + a `gsession.md` `§2.5` amendment + a red-first row. **The plan's own drag unit does NOT need it** (`§5.4`) — the variant is named only so nobody takes it silently. |

### §6.4 The stop-and-ask points (each is `AGENTS.md` item 10a's return point 2)

1. **The admission of the six units** (`§5.8`): the ledger is closed at `21 DONE / 0 open` and `RCA-8(f)`
   admits no successor row. **Nothing in `§6` may be started before this.**
2. **The tier-1 facility question** (`§5.1`): supersession vs the row's own new-gate route. **It blocks
   `U-STORE-PERSIST`, `U-STORE-LAYOUT` and `U-STORE-DRAG`'s release hop.**
3. **The process/realm split** (`§9` Q-1) and **the channel-constant home** (`§2.4`/`§9` Q-3): they block
   `U-STORE-CORE`'s contract.
4. **The security tier's read scope** (`§9` Q-2): it blocks `U-STORE-SECURITY`'s contract.
5. **THE PARKING** (STEER (C)): the family-side clamp unit **does not become a unit** — its questions are
   absorbed as `§1.6`'s `ZQ-1`..`ZQ-4`, so **`U-STORE-LAYOUT` inherits them and no longer waits on a filing.**
   **The row's clause-5 admission is annotated, never deleted** (the annotate-never-rewrite convention).
6. **THE SHARED SURFACE'S SCOPE** (`§9` Q-13): does *"for owned data/settings"* mean **only the modules that
   own data** (the plan's reading — ten edges), or **every** shared module holding a store handle (five more
   edges, five more moving modules, a larger re-vendor)? **This blocks `U-STORE-MODULES`' contract and it
   changes `§5.6.1`'s list — so it must be answered BEFORE that unit's spec gate.**
7. **THE RE-VENDOR SCHEDULING AND ITS RECORDING SITES** (`§9` Q-14): the obligation is itemized at `§5.6`
   and **owed to `docs/FORKER.md` `§4` + `docs/pending.md`'s fork-request region — two EXISTING FILES this
   plan may not modify.** **Who writes them, and in which pass, is the architect's call.** **⟶ ANSWERED
   2026-10-01 (`Q-14`): ONE documentation pass AFTER `U-STORE-MODULES` LANDS, recorded as OWED now
   (`§5.6.4`/`§5.6.5`).**
8. **⟶ ADDED 2026-10-01 — THE TWO ROUTED AMENDMENTS OF THE TABS SLICE (`§1.7` item 8): `docs/specs/
   mcp-endpoint.md` §3.8 AND `docs/specs/focus-tool.md`'s refusal rows must both be amended so
   `unknown-id` is unreachable from the focus verb (an unknown or unrenderable target opens an ERROR TAB).
   EACH OWES ITS OWN GATE, and NONE IS PERFORMED BY THIS PASS** — **so `U-STORE-FOCUS`'s contract may not
   be finalized before both land** (`§6.5`). **The refusal union itself stays FUNCTION-INTERNAL, so NO
   `focus-model` register re-grain is owed** (`§1.7` item 9).
9. **⟶ ADDED 2026-10-01 — `RH-2`'s CONTRACT GATE (`§7.1`): the model TAKES `RH-2`, and its fix SUPERSEDES
   `docs/specs/gutter-ui.md` §2.3 row 16's as-filed *"the wiring does not re-attach"* ruling. THAT ROW IS
   A LANDED RULING THIS PLAN MAY NOT SUPERSEDE, so the amendment is ROUTED to the architect and NOT
   edited here.** **`U-STORE-DRAG`'s contract waits on it.**
10. **⟶ ADDED 2026-10-01 — `OPEN-1` (`§9.1`): whether the persisted tab list carries a DECLARED CAP.**
    **It blocks no unit; it is a `U-STORE-FOCUS` contract clause, and its absence is a declared position
    (no cap), not a gap.**

---

### §6.5 THE AMENDED UNIT SPLIT (2026-10-01) — the same SIX proposals, with the answered scope absorbed, and **NO UNIT ADMITTED**

**THE HEADLINE, STATED FIRST SO NOTHING IS OVER-READ.** **THE LEDGER IS CLOSED AT `21 DONE / 0 open`
UNITS = `21` and `RCA-8(f)` ADMITS NO SUCCESSOR ROW — ONLY THE ARCHITECT ADMITS A ROW.** **This
amendment therefore adds NO SEVENTH UNIT and moves NO ledger row.** **The units below remain PROPOSALS,
they have no spec, no red set, no register and no admission, and `§5.8`'s stop-and-ask point 1 is
unchanged: **nothing may be started before the architect's admission.** **What this section amends is
SCOPE — the work the architect's fourteen answers put INSIDE the same six proposals.** **`§6.3`'s
six-unit table keeps its bytes and is the as-filed record; this table is the live split (`RCA-8(d)`).**
**No unit's id changes, so no citation of `U-STORE-*` breaks.**

| Unit (id unchanged) | The amended CONTRACT (what its spec must pin) | Its EVIDENCE LAYER, honestly | Its STOP-AND-ASK points |
| --- | --- | --- | --- |
| **`U-STORE-CORE`** | the model itself: three non-security tiers **all in the renderer realm** (`§2.5`); the layered read with its `{value, tier, cache, name}` shape and its **never-a-default** miss rule; the naming grammar **plus `§1.8`'s DECLARED NAME REGISTRY as the SECOND CONTRACT SURFACE** (undeclared/double/wrong-tier/malformed/reserved refusals, each with a positive control); **constraints as a FIRST-CLASS MODEL ELEMENT with the declared `REPAIR` outcome** (`§1.7` item 3); **`remove(name)` as a FIRST-CLASS OPERATION** with its four obligations and the two negatives (`set(name, undefined)` is not a deletion, and there is no third state); commit-clears-lower (C-1..C-5); the listener surface with **the one-event clear-then-notify rule** (`Q-7`); `secure.*`'s typed refusal; **and `RH-1` FOLDED IN — the GENERATION LIFECYCLE: a generation that is discarded must dispose, because a store subscriber registered per generation on a generation that never disposes is a live listener on a dead generation** | **`[T]`** (the tier search, the clear rule, the refusals, the constraint/repair, `remove`, the caps — all exhaustively enumerable over a fixed table set) + **`[H]`** (the wiring's drives). **`RH-1`'s own evidence is `[T]`-reachable and its falsifier is runnable node-side** (layer 2 `§6` `RH-1`: `finalizeHookCount()` before/after `1` construction, then `N` loads, then one `validate` — predicted `1`, `1+N`, `1+N+2`) | the admission; **`Q-1` is ANSWERED (`§2.5`) but the tier-1 channel's own contract is `U-STORE-PERSIST`'s**; the registry's name set (**the declarations are the caller's — the unit needs the SLICE's names, `§1.7`**); `RH-1`'s disposal site (**who calls `dispose()`, and whether a hook-based release is enough**) |
| **`U-STORE-PERSIST`** | tier 1 **as the renderer's own table** + the main-side channel: **`Y-1` hand-off, `Y-2` commit/remove receipts, `Y-3` push (declared no-op)**, the **atomic `${path}.tmp` + `renameSync` + `fsync` + corrupt-at-read-back recovery duties behind the channel** (with `security-store.ts`'s plain `writeFileSync` **named as the pattern NOT to copy**), **the changed BOOT ORDER** (`§2.5`), the settings file's own schema version from its first write, and **the `Q-5` MODULE-STORE MIGRATION** (`§3.9` item (iii): the five steps, the SHA-256 re-verification's new home, the one-boot legacy window, `IPC_MODULE_SET_DISABLED` as the single writer) | **`[H]`** (the file's bytes, the atomic shape, the receipt, the refusal; the migration's two files) + **`[T]`** where a shim-hosted realm can drive the hand-off | **the facility row is ANSWERED (`§5.1`: supersession taken)**; the channel-constant home is ANSWERED (`Q-3`: host-side file); **the legacy file's retention-then-removal is a WORKING DEFAULT the architect may reverse**; **`OPEN-1` (`§9.1`) touches this unit: the persisted tab list's retention** |
| **`U-STORE-SECURITY`** | tier 4: the re-home into the tier vocabulary, **the atomic write**, **the receipt (no swallow — the `F-6` half that lives here)**, the `secure.*` refusal, the **unchanged** manual-UI-only discipline, **AND `RH-3` TAKEN**: the pane graph's journal gets a **cap** (`maxJournalLength` on the pane `Supervisor`) and **the per-reply `refreshDebug` burst is stopped** — **its own contract rows**, with the pane graph's isolation preserved (`§2.3` row 2.4-11) | **`[H]`** (the file, the receipt, the gate's behaviour under a patch, the pane journal's depth via a test-side seam) — **and NO `[U]` row is needed for the tier itself** (`Q-2`: the renderer never reads tier 4, so no rendered surface changes). **`RH-3`'s falsifier needs ONE seam** (layer 2 `§6`: a read-only journal accessor or an engine-side count in a test that constructs the pane graph) — **the seam is the unit's to declare** | **`Q-2` is ANSWERED (the renderer never reads tier 4; the typed refusal stands)**; **`RH-3`'s cap VALUE and the burst's replacement are the unit's to propose and the architect's to rule**; the `F-6` two-holder shape is **NOT** fixed here (`§7.2`) |
| **`U-STORE-FOCUS`** | **SUBORDINATE TO THE TABS SLICE (`§1.7`) AND AMENDED ACCORDINGLY:** the focus state's carrier moves, **but the AUTHORITY for the entry set is tier 1's `file.tabs.*`** — so this unit's contract is **the holder's carrier + the tab slice's tier-1 record + the close verb's persisted removal + the reserved landing reference + the exactly-one-active constraint's repair arm**, and the `focus-tool.md` `§2.1` item 6 carrier amendment | **`[T]`** (the tab record's arithmetic: none — it stores what it is given; the constraint/repair; the removal's persistence) + **`[H]`** + **`[U]` MANDATORY for the two authored surfaces** (`§1.7` item 6: the landing and error pages are rendered UIs, and **a parked UI row is OPEN, never green**) | **`Q-9` IS SUPERSEDED BY THE SLICE — the cap question is not open; the SLICE's retention is (`OPEN-1`)**; **the two ROUTED amendments (`mcp-endpoint.md` §3.8 + `focus-tool.md`'s refusal rows) are a PREREQUISITE, each under its own gate — `unknown-id` must become unreachable before this unit's contract is final**; the authored pages' envelope home |
| **`U-STORE-LAYOUT`** | the working layout record (tier 2) + the committed layout, the window geometry and **the module registry's records** (tier 1) + the reveal/minimum references as **RECEIVED** values + **`§1.6`'s `ZQ-2`/`ZQ-3`/`ZQ-4`** | **`[T]`** (nothing: it stores what it is given) + **`[H]`** + **`[U]` MANDATORY** (a persisted layout restored across a boot is a rendered fact, `docs/specs/user-flow-audit.md` `§7.1` limb B) | **the `Q-5` migration's ordering is THIS unit's or `U-STORE-PERSIST`'s — the architect names the owner**; whether window geometry is in scope; **`ZQ-1`'s refusal surface is CORE's, `ZQ-2/3/4` are this unit's** |
| **`U-STORE-DRAG`** | the architect's drag example: the tier-3 episode, the per-move write through the **preview** channel, **the single sink invocation's two effects** (`SINK-1`..`5`), the terminal sweep, **the folded-in replacement of `writes` by the bounded last-commit receipt**, **`RH-2` TAKEN WITH ITS CONTRACT GATE** (a post-boot re-derivation must re-attach / re-resolve — **which SUPERSEDES `gutter-ui.md` §2.3 row 16's out-of-contract *"the wiring does not re-attach"* ruling and therefore OWES AN AMENDMENT TO that spec, ROUTED AND NOT PERFORMED HERE**), and the **`RH-6`** replacement | **`[T]`** (the counts: 1 sink write, ≤1 preview write per move, 0 on cancel) + **`[H]`** + **`[U]` MANDATORY** (`§7.1` limb **A** *and* **B**: the ghost and the revert are rendered surfaces) . **`RH-2`'s falsifier is explicitly `[U]`-only** (layer 2 `§6` `RH-2`: boot, dispatch a `code.load` over MCP, then a REAL pointer drag on the re-rendered handle and read `gutter-status`) | **`RH-2`'s contract gate: the architect must rule the re-attach semantics BEFORE this unit's contract is final** (`gutter-ui.md` `§2.3` row 16 is a landed ruling; this plan may not supersede it); `SINK-1`..`5` as rows; **`Q-8` is ANSWERED (no session channel)** |
| **`U-STORE-MODULES`** | **the SHARED-SURFACE ADOPTION AT THE ANSWERED SCOPE (`§5.2.6`: FIFTEEN EDGES)**: the fifteen modules' store edges (each with its own reads/writes and the **`§1.7` item 10 ambient-read constraint**), **`§5.9.1`'s re-classification** (one dated status cell per row), the **mandatory** `A-19` fifth question, the mandatory companion rows, **and the five kernels' new spec sections + register re-grains** | **`[T]`** (each module's own suite + its re-grained register) + **`[H]`** (the store-backed seams) + **`[U]` for any edge reaching an assembled rendered flow** — **and the honest form: five of the fifteen are imported by NO `src/**` file, so their `[T]` evidence is envelope-green by `RCA-12` and their live rows are parked ONLY for that STRUCTURAL reason** | the admission; **`Q-13` IS ANSWERED (all fifteen)**; **`Q-14`'s recording pass is OWED to this unit's landing** (one documentation pass after it: `docs/FORKER.md` §4, the `docs/pending.md` fork-request region, the feedback document); **`§5.9.1`'s outstanding sweep** (the unread `P-*`/`P-CT-*` rows) is owed to whichever unit is admitted first |

**THE THREE THINGS THIS AMENDED SPLIT *DOES NOT* DO, STATED SO IT IS NOT OVER-READ.** **(1) IT ADMITS
NOTHING AND MOVES NO COUNT** — the ledger stays `21 DONE / 0 open`; the units are proposals; **a
`docs/next-steps.md` row for any of them is an ADMISSION and only the architect may write it.** **(2) IT
ADDS NO SEVENTH UNIT** — the four newly-absorbed work items (`RH-1`, `RH-2`, `RH-3`, the tabs slice) are
distributed into the six existing proposals **precisely because a seventh row would be an admission.**
**(3) IT DOES NOT TOUCH A FROZEN CONTRACT** — `Q-8`'s answer keeps `gsession.md` `§2.5` byte-for-byte, and
**the two contracts this model genuinely supersedes (`mcp-endpoint.md` §3.8 and `gutter-ui.md` §2.3 row
16, plus `focus-tool.md`'s refusal rows) are ROUTED with their own gates and are NOT edited here.**

**AND THE DEPENDENCY GRAPH, AMENDED BY THE SLICE — `§6.2`'s as-filed graph is kept and this is its live
form.**

```
        (architect admission — §6.4 stop-and-ask 1; the ledger is CLOSED)
                     │
      ┌──────────────┼───────────────────────────┐
      ▼              ▼                           ▼
 U-STORE-CORE   U-STORE-SECURITY          (independent of CORE; now ALSO carries RH-3's journal cap)
 (the model +         │
  the REGISTRY +       │
  CONSTRAINTS +        │
  remove() +           │
  RH-1's lifecycle)    │
      │                │
      ▼                │
 U-STORE-PERSIST ──────┤  (needs CORE's read/commit/naming/registry; the tier-1 channel + the Q-5 migration)
      │
      ▼
 U-STORE-FOCUS  (needs CORE + PERSIST; carries the TABS SLICE and the two ROUTED amendments
      │          as a PREREQUISITE — unknown-id must be unreachable before its contract is final)
      ▼
 U-STORE-LAYOUT  (needs CORE + PERSIST)
      │
      ▼
 U-STORE-DRAG   (+ RH-2's contract gate + the folded-in diagnostic replacement for `writes`)

 U-STORE-MODULES  (the FIFTEEN-edge adoption; needs CORE + PERSIST; owes §5.9.1's sweep)
```

---

## §7. What it fixes — and what it makes worse

### §7.1 Layer 2's hazards `RH-1`…`RH-11`

| Hazard | What it is (layer 2 `§6`) | The plan's verdict |
| --- | --- | --- |
| **`RH-1`** (HIGH) — every discarded `Supervisor` is pinned by the engine's module-level `finalizeHooks` array, because this host never calls `Supervisor.dispose()` | **NOT FIXED, and NOT FIXABLE BY A STORE.** It is **engine reachability** reached through a host **non-call**; a store that held nothing of the graph changes nothing. **`U-STORE-*` must not claim it.** |
| **`RH-2`** (HIGH) — the gutter wiring is BOOT-ONLY; a re-derivation detaches the elements and the wiring never re-resolves them | **NOT FIXED — AND THE PLAN ADDS A "DO NOT MAKE WORSE" CONSTRAINT.** The store's **listeners are registered once and are inert in exactly the same circumstances** as the affordance is (`docs/specs/gutter-ui.md` `§2.3` row 16's ruled INERT consequence, read this pass). **A store subscription that survives a re-derivation while its elements do not would be a NEW inert-holder leak of the `RH-2` class** — so the drag unit carries a row: **a re-derivation leaves the store's drag references swept (rule C-5's sweep at the terminal) and no subscription holding a detached element.** |
| **`RH-3`** (HIGH) — the pane graph's journal has no cap and is fed by every MCP reply | **NOT FIXED.** A store is not a journal cap; the fix is a `maxJournalLength` on the pane Supervisor — **a one-line change in a different unit**, and this plan names it as a candidate it does **not** take (`§9` Q-10). |
| **`RH-4`** (MED–HIGH) — the focus holder's `entries` grows by one per distinct caller `target`, uncapped, with no removal path | **FIXED by `U-STORE-FOCUS`**: tier 2 is where the holder lives, **and every tier-2 collection carries a declared cap** (`§1.1` store 2's failure-mode list). **The cap is the mechanism; the row that pins it is the unit's.** |
| **`RH-5`** (MED) — the engine's default-scope registries never release the discarded generation's root | **NOT FIXED** (engine reachability). |
| **`RH-6`** (MED) — the wiring's `writes` array has no cap, and its only reader is a discarded handle | **FIXED by `U-STORE-DRAG`** (`§3.4` row 2.4-3): the array **dies**, replaced by the bounded `mem.diagnostics.lastCommit` + the store's commit receipt. **The duty it exists for is preserved as a ROW, not as a habit** — a deletion that loses the refusal reading would be a regression against `L-5`/`ADV-GU-1`. |
| **`RH-7`** (LOW–MED) — the `DomAdapter`'s `stylesSeen` and its single style element are never cleared | **NOT FIXED** (adapter-owned; and the shim's `head` is inert, so no node-side row can see it — layer 2 `§7` item 3). |
| **`RH-8`** (LOW) — a runtime module install re-syncs the router but does not re-register a long-lived stdio server's tools | **NOT FIXED.** |
| **`RH-9`** (LOW) — a skipped condense re-schedules on every applied op | **NOT FIXED.** **But the plan INTERACTS with it**: tier 4 still supplies `maxJournalLength` (`§3.3` row 2.3-14), so a short threshold still reaches this engine path. |
| **`RH-10`** (LOW) — a pending condense fires on a supervisor a `load` already discarded | **NOT FIXED.** |
| **`RH-11`** (LOW) — `registered`/`resources` are shared across HTTP servers while HTTP builds a fresh server per POST | **NOT FIXED.** |

**THE HONEST TALLY: `2` hazards fixed (`RH-4`, `RH-6`), `9` left, `0` made worse** — with **one new
hazard the plan introduces and names** (`§7.3` `NW-1`).

**⟶ AMENDED 2026-10-01 (`Q-9` ANSWERED, `Q-10` ANSWERED): THREE HAZARDS MOVE TO FIXED, ONE MOVES TO
FIXED-BY-THE-SLICE, AND THE TALLIES BELOW ARE THE LIVE ONES.** **The as-filed table above is kept
byte-for-byte (`RCA-8(d)`); this block is what a unit must be written against.**

- **`RH-1` — `FIXED BY THIS MODEL`, FOLDED INTO `U-STORE-CORE`'s LIFECYCLE.** **WHY IT IS NOW THE MODEL'S
  PROBLEM RATHER THAN AN ENGINE FACT:** the model registers **store subscribers per graph generation**, so
  **a generation that never disposes leaves LIVE LISTENERS ON A DEAD GENERATION** — the store would hold
  closures whose owner the engine still pins. **Disposal therefore becomes a CORRECTNESS PREREQUISITE, not
  a memory nicety.** **The two landed facts this rests on, both read from layer 2's engine work (`[T]`
  mechanism + `[H]` non-call, quoted with that ownership): every discarded `Supervisor` is pinned by the
  engine's module-level `finalizeHooks` array because the host never calls `Supervisor.dispose()`; and
  `provident.validate` leaks TWO more per call** (`Runtime.validateExport` + `Runtime.validateSig`'s
  throwaway supervisors). **ITS FALSIFIER (node-side and runnable, layer 2 `§6` `RH-1`): read the
  package's exported `finalizeHookCount()` before and after `1` construction, then after `N` loads, then
  after one `validate` — predicted `1`, then `1 + N`, then `1 + N + 2`; under the fix the discarded
  generations' hooks are released and the count does not grow with `N`.** **`U-STORE-*` MAY NOW CLAIM
  `RH-1`, and only against that reading.**
- **`RH-2` — TAKEN, WITH ITS CONTRACT GATE (it is NOT free).** **The model's listeners are registered per
  reference and are re-registered per generation, so a post-boot re-derivation that leaves the wiring
  attached to the PREVIOUS tree's elements would leave the store driving a surface nobody sees.** **The
  ruling the fix needs SUPERSEDES `docs/specs/gutter-ui.md` §2.3 row 16's as-filed out-of-contract
  result (*"the wiring does NOT re-attach"*, the affordance *"becomes INERT (no gesture, no cursor, no
  preview)"*) — a LANDED ruling this plan may not supersede — so the amendment is RECORDED, ROUTED, AND
  NOT PERFORMED HERE (`docs/specs/gutter-ui.md` is not this pass's file to change on that row).** **The
  owed amendment's shape (for the architect, not decided here): a re-derivation RE-RESOLVES the wiring's
  elements (the `elementForNodeId` route, `[H]`), the session's and the affordance's listeners are
  re-installed on the new elements, and the store's subscriptions are re-registered against the new
  generation — with the OLD generation's subscriptions released in the same step (`RH-1`'s discipline).**
  **ITS FALSIFIER is `[U]`-only and is layer 2 `§6` `RH-2`'s own: boot the app, dispatch a `code.load`
  over MCP, then perform a REAL pointer drag on the re-rendered handle and read `gutter-status` — a commit
  that never lands CONFIRMS the hazard, a landed commit FALSIFIES it.** **Until the amendment is granted,
  `U-STORE-DRAG` carries the as-filed *"do not make worse"* row only: no subscription holding a detached
  element.**
- **`RH-3` — TAKEN, WITH ITS OWN CONTRACT ROWS (in `U-STORE-SECURITY`, whose pane graph this is).** **The
  fix has two halves, both required: (a) the pane graph's `Supervisor` is built with a declared
  `maxJournalLength` (condense can then fire), and (b) the per-MCP-reply `refreshDebug` burst stops** —
  today `bridge.onRequest`'s `.then((reply) => { panels?.refreshDebug(runtime); … })` re-syncs the pane
  graph **after every reply** (`[H]`). **ITS FALSIFIER (layer 2 `§6` `RH-3`): drive
  `SecurePanels.refreshDebug` `N` times and read the pane supervisor's `undoDepth` — predicted to grow by
  one per mutated pane node per refresh — which needs a read-only journal accessor (a test-side seam the
  unit declares) or an engine-side count taken in a test that constructs the pane graph itself.**
- **`RH-4` — `ANSWERED BY THE TABS SLICE`, NOT BY A CAP ON THE HOLDER (`Q-9` is SUPERSEDED).** **The
  as-filed fix (*"tier 2 is where the holder lives, and every tier-2 collection carries a declared cap"*)
  is WITHDRAWN AS THE ANSWER: the renderer holder STOPS BEING THE AUTHORITY.** **Under `§1.7` the entry set
  is tier 1's `file.tabs.*`, it has a FIRST-CLASS REMOVAL PATH (the close verb → `remove(name)` → a
  PERSISTED removal), and it always holds at least the reserved landing entry** — so **the unbounded-growth
  shape `RH-4` names is bounded by construction rather than by a cap, and the reply's `entries[]` is the
  caller's own tab list rather than an ever-growing accumulation.** **ITS FALSIFIER is now the slice's own
  rows: an entry appended without a tab, a closed tab still readable, or `entries.length` growing across a
  restart that the file does not carry.** **`RH-6`'s verdict is UNCHANGED (`FIXED by U-STORE-DRAG`), and
  its duty survives as a ROW, not a habit.**

**THE RE-COUNTED TALLY, WITH ITS TERMS (`2 + 3 = 5` fixed · `4 + 2 = 6` left · `0` made worse as filed,
plus the four NEW `NW-*` rows `§7.3` adds):** **FIXED — `RH-1` · `RH-2` (conditional on its contract gate)
· `RH-3` · `RH-4` · `RH-6` = `5`. LEFT — `RH-5` · `RH-7` · `RH-8` · `RH-9` · `RH-10` · `RH-11` = `6`,
ALL with their as-filed falsifiers intact.** **`5 + 6 = 11` ✔ — the identity closes over the eleven
hazards layer 2 ranked, which is the only form of this count that is checkable.**

### §7.2 Layer 1's findings `F-1`…`F-15`

| Finding | Substance (layer 1 `§7`) | The plan's verdict |
| --- | --- | --- |
| **`F-1`** | the Runtime constructor seeds payload `userData` with the envelope's content ARRAY while the load path seeds `translated.userData`; the constructor's argument is pinned by nothing | **LEFT** — a boot-path contract question, untouched. |
| **`F-2`** | the module system's renderer half has no shipped consumer (U5/U6 recorded LANDED but unwired) | **LEFT** — and the plan creates **no** tenant there (`§3.2` row 2.2-17). |
| **`F-3`** | two store methods have no shipped caller (`setDisabled` only via IPC; `remove` nowhere) | **LEFT.** |
| **`F-4`** | `themeWiringRole` is exported and called by nobody | **LEFT** (the theme setting moves tier, the inert role stays inert and uncalled). |
| **`F-5`** | two holders of the element-id kind (the engine registry + `cssIndex`/`propsIndex`) | **LEFT — AND EXPLICITLY NOT WORSENED**: `§1.3` R-5 forbids a reference from naming an engine/node id, so the store cannot become a **third** holder of that kind. |
| **`F-6`** | two holders of the tool-access kind (the persisted store + the live gate) with a **swallow** between them | **PARTIALLY FIXED AND PARTIALLY LEFT — stated honestly.** The **swallow** is fixable by the store's receipt discipline (`§1.1` store 4's failure modes: a persist failure must surface, not be caught-and-ignored — the landed `security-store.ts` `persist()` catches and ignores, read this pass `[H]`). **The TWO-HOLDER SHAPE IS NOT FIXED** (`§3.2` row 2.2-1): the gate remains the live reflection. **Merging them would change `M1`'s re-gate semantics — a contract change this plan does not take.** |
| **`F-7`** | the boot snapshot `persisted` is read once and never refreshed | **FIXED** — the row is deleted (`§3.1` row 2.1-5). |
| **`F-8`** | the `provident:invoke` channel name is a literal in one place and the `IPC_INVOKE` constant in the other, and no row pins the agreement | **NOT FIXED — AND THE PLAN CAN MAKE IT WORSE.** A store channel whose name is spelled twice would be the same class; `§1.3` R-2 requires **one declaration** and the store's own unit owes **a row pinning literal==constant**, with a positive control. **Named as a risk (`§8`), not as a fix.** |
| **`F-9`** | a doc claim (`mcp-endpoint.md` `§3.6`: *"the host never sets `maxJournalLength`"*) that contradicts the code | **LEFT to the pass that touches that file** (the plan keeps `maxJournalLength` in tier 4 and thereby keeps the code's behaviour; **the doc cell must be fixed where it lives**). |
| **`F-10`** | window geometry is stored nowhere and recorded nowhere | **FIXED** — `file.window.bounds` (A-1), a tier-1 tenant with **no IPC at all**. |
| **`F-11`** | the application menu is stored nowhere and authored nowhere | **LEFT, DELIBERATELY, WITH ITS LAWFUL HOME NAMED** (A-4: tier 1, no tenant created). |
| **`F-12`** | `dom-shim.ts` writes a process global and holds a module-level registry | **LEFT** (and `§3.5` row 2.5-7 forbids the store from becoming a shim tenant). |
| **`F-13`** | `randToken` in `secure-panels.ts` is dead code | **LEFT.** |
| **`F-14`** | two gate-map-only keys are unroutable by design but look like tools | **LEFT.** |
| **`F-15`** | the tree carries work dated AFTER the audit's filing date | **LEFT** (a dating observation). |

**THE TALLY: `F-7`, `F-10` fixed; `F-6` half-fixed (the swallow) and half-left (the two holders); `12`
left.** **A plan that claimed more than this would be over-reading its own ledger.**

### §7.3 THE THREE THINGS THE PLAN MAKES WORSE — stated plainly, which is the only honest form

**⟶ AMENDED 2026-10-01: `NW-1` IS DELETED (`Q-1`: no mirror) AND FOUR ROWS ARE ADDED (`NW-6`…`NW-9`), so
the live count is `NW-2` · `NW-3` · `NW-4` · `NW-5` · `NW-6` · `NW-7` · `NW-8` · `NW-9` = **EIGHT** — and
`NW-1`'s number is RETIRED, NOT REUSED.** **The heading above is kept as filed; the arithmetic is stated
here because "three" is no longer the live figure and a stale count is a finding.**

**`NW-1` — ⟶ DELETED 2026-10-01 (`Q-1`, ANSWERED): THE HAZARD THIS ROW NAMED DOES NOT EXIST, BECAUSE
THE THING IT WAS ABOUT DOES NOT EXIST.** **The as-filed row read *"THE RENDERER'S TIER-1 MIRROR IS A
SECOND HOLDER OF TIER-1 STATE (`F-6`'s class, in a new place)"* and priced it against `NW-1`'s staleness
row. THE ARCHITECT'S `Q-1` ANSWER REMOVES THE MIRROR ENTIRELY (`§2.5`): the renderer owns tier 1's
VALUES, and `main` owns the file and the channel — so there is no mirror, no second holder of tier-1
state, and no staleness window between a mirror and its source.** **WHAT REPLACES IT IS NOT A HAZARD BUT
AN ORDERING ROW: a value written to the FILE by anything other than the channel is invisible to the
renderer's own table until a re-hydration — `§2.5`'s `Y-3` push path, specified and a declared no-op on
today's single-window app** (`§1.1` store 1's failure mode 5). **THE DELETION IS RECORDED HERE RATHER
THAN SILENT (the repo's annotate-never-rewrite convention): the row's number `NW-1` is RETIRED and NOT
REUSED, so no citation of `NW-1` resolves to a live hazard, and this tombstone is why.** **`NW-2`…`NW-5`
keep their numbers and their bytes.** **A reader who finds `NW-1` cited elsewhere in this document should
read that citation as PRE-ANSWER PROVENANCE.**

**`NW-2` — A STORE IS A SECOND AUTHORITY OVER ANY VALUE A LANDED ROW ALREADY OWNS, AND THERE ARE EXACTLY
THREE SUCH VALUES IN THIS PLAN.** (a) **The committed drag/theme value is the GRAPH's** — so the store is
the **persistence and the working copy**, and **the graph stays the authority** (`P-E2`; `§4` FLAG-4). (b)
**The tool-access kind is the GATE's live reflection** — so tier 4 replaces the file holder and **not** the
gate (`F-6`, unchanged). (c) **The gesture lifecycle is the SESSION's** — so the store mirrors **nothing**
of it (`§3.4` rows 2.4-7/8/9). **Each of the three is a "must not cross" line, and each is a row.**

**`NW-3` — A LISTENER ON A HOT REFERENCE CAN RE-RENDER TOO OFTEN, AND THE DRAG PATH IS WHERE IT BITES.**
A `temp` reference written once per observed move, with N subscribers, produces **N listener invocations
per move**; **a subscriber that patches the graph would re-render the tree per move** — the exact hazard
`docs/specs/gutter-ui.md` `§2.5` item 5 names (*"the re-render replaces the element under the pointer
mid-gesture"*, read this pass). **MITIGATIONS, ALL REQUIRED BY THE PLAN: (i) at most ONE presentation write
per observed move; (ii) NO graph write on the hot path at all; (iii) prefix/tier-wide subscriptions carry a
declared cap and are refused past it; (iv) the temp tier declares an entry cap.** **A drag unit that fails
any of the four is a regression against a landed spec, not a performance nit.**

**AND THE FOUR HAZARDS THE ANSWERS CREATE — stated plainly, in the same form as `NW-2`…`NW-5`, because an
amendment that adds surface without pricing it is exactly the laundering this section exists to prevent.**

**`NW-6` — THE NAME REGISTRY IS A SECOND CONTRACT SURFACE, AND A SECOND SURFACE IS A SECOND PLACE TO BE
WRONG.** **`§1.8` makes *one spelling, one home* a REFUSED WRITE — a real gain (`F-8`'s class, made
mechanical) and a real cost: the registry is an artifact that must be kept CURRENT, and it brings its own
failure modes (a name declared but never used; a name used but not declared, which now FAILS a write that
used to work; a rename that must move every declaration row).** **THE MITIGATION IS A ROW, NOT A PROMISE:
(a) the registry has its OWN failure-mode table with a POSITIVE CONTROL per row (`§1.8` `G-1`…`G-8`), so a
blanket-denial implementation FAILS; (b) the declaration is HOST-SIDE and single-sourced (`R-2`);
(c) `R-1`'s no-vocabulary rule binds the registry's own bytes with a scan row and a positive control
(`§5.9` rows 11/12).** **THE FALSIFIER: a write that succeeds against an undeclared name, or a registry
whose scan row passes while it ships an `is-active` key.**

**`NW-7` — THE TAB LIST IS A PERSISTED LIST THAT GROWS ACROSS RESTARTS, AND PRUNING IS THE OPERATOR'S
ACTION.** **`§1.7` item 4 makes the list unbounded but prunable; it does NOT make it bounded.** **So the
model introduces its first PERSISTED, UNBOUNDED-BY-CONSTRUCTION collection** — and **a restart no longer
resets it**, which is the `RH-4` shape moved into tier 1 BY DESIGN. **THE MITIGATION IS PARTIAL AND IS
STATED AS PARTIAL: the close verb is a real removal path (the first this app has ever had for this state)
and the reserved landing entry guarantees non-emptiness — but NO CAP IS DECLARED, and whether one is owed
is `§9.1` `OPEN-1`.** **THE FALSIFIER: a boot sequence in which the tab list is longer than the operator
ever opened, or a restart that does not reset the list while no removal path is reachable.**

**`NW-8` — THE REPAIR ARM HAS ITS OWN FAILURE MODES, AND `REPAIR` IS A POLICY THE MODEL NOW OWNS.**
**A repair that fires is a write the caller did not ask for**, so the model gains three new failure
classes: **(a) an UNREPORTED repair** (the operator's action and the store's state diverge silently — the
receipt's `repaired:[…]` is the only channel, and a body that repairs without reporting is a SILENT
SECOND WRITE); **(b) an ORDER-DEPENDENT repair** (which tab wins must be the DECLARED rule over
`file.tabs.order`, never a store-side choice — a store that picks by insertion time is a second policy
authority, `§5.9` row 5's class); **(c) A CASCADING REPAIR** (a repair write that itself violates a second
constraint — the model declares ONE constraint today, and a second one owes its interaction rule before it
is declared).** **THE MITIGATION IS A ROW: the repair's rule is DECLARED, the repair is REPORTED in the
receipt, and a constraint's evaluation is TOTAL over the write's post-state.** **THE FALSIFIER: a write
leaving `0` or `≥2` active tabs, a repair that lands without `repaired:[…]`, or a repair whose winner
depends on anything other than `file.tabs.order`.**

**`NW-9` — THE ERROR AND LANDING SURFACES ARE RENDERED UIs, SO THE SLICE OWES A LIVE BATTERY A NODE SUITE
CANNOT DISCHARGE.** **`§1.7` item 6 adds two authored surfaces, so the tabs slice's truth is partly
`[U]`/APP — and `RCA-12` binds (a node-green on the slice is ENVELOPE-green and NEVER APP-green), while
gate 6's rule is that for a UI unit the battery is MANDATORY pre-DONE and a merely-parked battery is
`OPEN`, not a pass.** **THE MITIGATION IS A ROW, NOT A HABIT: each page owes its own `§5.U` live row, its
own `§6.1` coverage report and the `§6.2` read-only audit** (`docs/specs/user-flow-audit.md`), **and the
only lawful park reason is STRUCTURAL — a surface the MCP+CDP instruments cannot reach, which NEITHER
page is (both are ordinary authored nodes in the app's own mount).** **THE FALSIFIER: a slice reported
green with a parked or absent live row for either page, or an `npm run ui` reading reported as proof that
the ERROR page rendered** (`docs/specs/ci-ui-leg.md` `§3.3` `C-7` binds that leg's own limits).**

---

### §7.4 The PARKING's consequence, and the two things the SHARED-SURFACE ROUTE makes worse

#### §7.4.1 — The parking (STEER (C)) **What is parked is
the separate UNIT, not the question.** The admitted-but-unfiled family-side minimum-clamp unit
(`ZONE-SIZE-DOMAIN-…` clause 5) **does not become a unit**; its four undefined semantics are **absorbed as
`§1.6`'s `ZQ-1`..`ZQ-4`** and re-homed into `U-STORE-CORE` (the refusal surface), `U-STORE-LAYOUT`
(ZQ-2/3/4) and `U-STORE-DRAG` (ZQ-1's in-flight attempt). **What the parking FIXES: one fewer admitted unit
and one fewer gate chain.** **What it COSTS, stated honestly: four semantics that would have been one
unit's open list are now rows spread across three units — the questions are not smaller, they are
re-homed, and each now shares a gate with other work.** **And the ruling's own consumer-side clauses are
UNMOVED** (`0` = the minimize verb; the retained location; the consumer's mapping; the family's pure clamp
as the one clamp site).

**§7.4.2 — `NW-4`, A NEW "MAKES WORSE" ROW THE SHARED-SURFACE ROUTE CREATES: A STORE READ INSIDE A SHARED
MODULE CAN MAKE A PURE DECISION AMBIENT.** The ruling permits the shared surface to hold store
dependencies — and **the moment a module's answer depends on a store read, that answer depends on STATE,
not only on its arguments.** That is admissible for **owned data/settings** (the ruling's own qualifier) and
**not** admissible for a **consumer decision the landed rows have already placed** — emptiness, tokens, the
reveal, the min/max policy, the gesture lifecycle, the element-id space. **CONCRETE CASE, AND IT IS THE ONE
THAT MUST NOT HAPPEN: `zones.ts`/`census.ts` reading a store for `size`/`revealed` would move the emptiness
authority out of the caller's predicate and into ambient state — the `V-13` class, reopened — and the
`A-19` probe as it stands would NOT catch it** (its four questions are about the module's census/token
behaviour, not about store reads). **THE MITIGATION, AND IT IS A ROW, NOT ADVICE:**
**(a)** `§5.2.3` gives `zones.ts`/`census.ts` **`NO EDGE`** (they own nothing); **(b)** `§5.9` row 13
**extends the `A-19` probe by a fifth question** (*"or a store-sourced value consulted for the emptiness
decision"*); **(c)** `ZQ-3` keeps the mapping consumer-side; **(d)** the store's own miss rule **forbids an
invented default** (`§5.9` row 5 — otherwise the store becomes a policy default in a new place).
**A unit that grants a pure kernel a store edge for a consumer decision is a FINDING, not a design choice.**

#### §7.4.3 — NW-5 — the fork’s moving surface widens **Eight mechanism modules move instead of zero**
(`§5.6.1`), so **the fork's digest set, its conformance leg's inputs and its re-run list all grow**, and
**the foundation now ships a store the fork must decide about.** **This is not a correctness risk; it is a
coordination cost the architect has accepted (STEER (B)) and this plan itemizes rather than argues.**

#### §7.4.4 — The supersession ledger’s own cost **Four rows are superseded in a general form
(`§5.9` rows 6, 19, 20, 21), one unit-admission clause is parked (row 26), twenty rows are compatible
additions that must nevertheless be RE-WORDED where the general clause lives, and one classification is an
open FINDING (Q-13).** **Consequence: the spec corpus's no-store language must be amended IN TEN
CONTRACTS (§5.9 row 6's cost cell) — a documentation pass larger than any single unit in `§6`.** **A pass
that moves the aggregate row (`A-2`) without moving the ten per-contract rows leaves ten contradicted rows
behind — which is why `§5.9` itemizes them rather than citing the aggregate.**

---

## §8. Costs and risks

### §8.1 The gate chain a code-bearing unit of this size owes

**For each of the six units, in this order — and this is the repo's own chain, not this plan's invention:**
**gate 1** (proposal review: `role_validity` ∥ `role_critique` → `role_architecture_review` →
`role_change_analysis`, with the **STEP-0 adoption dossier** required where the contract's vocabulary
originates outside this project — **and this plan's vocabulary does**: *"temp cache"*, *"layered read"*,
*"commit clears lower"*, *"reference listener"* are the architect's words, so **`docs/specs/store-core-
adoption-dossier.md` (proposed) with ≤8 identifier rows, each with its source citation and STATUS, is a
gate-1 input** — plus the **collision block** against this repo's prohibition rows, which for this
vocabulary means at minimum `S-d8` `(C)#4`, `H-r15`'s mirror-class hazard, `P-CT-1` and the no-store rows)
→ **spec gate** (the contract, filed and approved — **the one approval the chain waits for**,
`AGENTS.md` item 10a) → **red** (`role_test_writer`, reporting the failing set) → **green**
(`role_implementer`, least code) → **gate 4** (read-only adversarial + **the read-only PBT audit**) →
**gate 5** (blind greens from the docs only) → **gate 6** (the live battery: **MANDATORY for
`U-STORE-LAYOUT` and `U-STORE-DRAG`**, whose flows trigger `docs/specs/user-flow-audit.md` `§7.1` limb B —
a visible drag, a visible ghost, a visible revert, a restored layout; **a parked UI battery is OPEN, not
green**) → **gate 7** (proofreader) → **gate 8** (per-unit documentation review) → **gate 9** (the trio
`npm test` + `npm run typecheck` + `npm run build`, **plus the additive `npm run typecheck:tests` leg** —
`AGENTS.md` item 4's fourth leg, which is the **only** leg that compiles `tests/**`) → **gate 10** (the DONE
row + the ledger move), **committing at every gate boundary** (`RCA-8(a)`), **one unit per commit**
(`RCA-8(f)`).
**And the layer rule binds the reporting**: `RCA-12` — **a node-suite green is ENVELOPE-green, never
APP-green**; the stores' `[T]`/`[H]` evidence must never be reported as *"the app works"*, and for
`U-STORE-LAYOUT`/`U-STORE-DRAG` the rendered layer needs its **own** verification (a rendered-DOM/assembly
row + the live battery), not the node suite wearing a different label.

### §8.2 The typed `§5.x` register obligation

**Each unit is code-bearing** (`AGENTS.md` item 11 / `docs/decisions.md`
`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, cited by row name), so each needs a **typed register authored by
`role_spec_writer` BEFORE its red set** — `P-IM`/`P-SM`/`P-TP` rows only, **never** `F-` or `§6`/`FS-n`
rows, executed deterministically (enumerated or pinned-seed, ≤100 attempts/row, ≤400 total, stop-after-5,
per-row strategy id + held/broken, totals printed **with their terms**, no new dependency), then audited
read-only at gate 4. **The model's central claims are unusually well-shaped for this**, and the plan names
the four rows each `U-STORE-CORE` must carry: **(i)** `P-IM` — *for every reference in the declared table
and every tier state, a commit to tier k clears exactly the declared lower aliases and never a higher tier*
(the C-1/C-4 invariant, exhaustively enumerable over a fixed table set); **(ii)** `P-TP` — *for every
name in the grammar's domain (a tier token × a caller segment × a path), `read` answers a total record and
never throws* (a pinned-seed draw over a name pool); **(iii)** `P-SM` — *the episode lifecycle
(`temp` set → commit → clear → miss → fall-through hit) is a closed state machine with no unreachable
terminal*; **(iv)** `P-IM` — *the generic surface refuses every `secure.*` reference* (with a positive
control proving the refusal is by the name and not by a blanket denial). **The `≤8` figure is a
component-breakdown SIGNAL, never a ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-…`, cited by row name).

### §8.3 The fork's re-vendor cost — **ACCEPTED, and its arithmetic is `§5.6`**

**THE DRAFT'S *"0 vendored mechanism modules move"* IS WITHDRAWN** (STEER (B)). **The accepted cost, in one
line each: `8` mechanism modules move their bytes (`gutter`, `relocate`, `menu-template` latently,
`owned-list-host`, `slot-host`, `overlay`, `theme`, and `types.ts` if the channel constants land there);
`7` hold their digest (`zones`, `census`, `container`, `gesture-session`, `layout-projection`,
`mount-invariant-guard`, `gutter-affordance`); `5` host files move (`main.ts`, `preload.ts`,
`security-store.ts`, `mcp-server.ts`'s one-line options pass, `renderer.ts`) plus the new store modules;
and the fork must re-digest, re-run its conformance leg (`N = 9`) and re-decide its own carrier question
against a foundation that now ships a store.** **The four recording sites, all named and all OWED, are
`§5.6.4` — and note that this repo writes no file under the fork's tree (`H-r6`).** **The one clause the
draft got right and which still holds: the plan adds NO MCP member (`§5.5` `PAR-1`), so the fork's census
rows hold if it asserts them by name-set equality — and it should, per the `H-r18` rule
`docs/FORKER.md` `§3` itself states.**

### §8.4 The performance cost of a layered read on a per-move path — sized honestly

**WHAT THE PLAN CLAIMS, AND WHAT IT DOES NOT.** **Claim (a `[T]`-shaped claim about the code's shape, not a
measurement): `read(name)` on the drag path is a SYNCHRONOUS, IN-REALM operation of at most three Map
lookups plus one listener dispatch.** **No IPC, no serialization, no allocation beyond the returned
record.** **What the plan does NOT claim: any timing figure.** **This pass ran nothing (`§10`), so there is
no number here — and a number would be a `[U]`-layer measurement anyway.**

**THE COSTS THAT ARE REAL, STATED AS COSTS.**
1. **The per-move listener dispatch is the only new per-move work**, and its size is `N` (subscribers) ×
   the listener body. **The plan's cap on N's *behaviour*** (no graph write per move, ≤1 presentation
   write per move) matters far more than N's *count*, because the presentation write is a DOM style write
   that already happens once per move today.
2. **The commit is ONE IPC round trip per gesture** (`§2.2` X-2) — on the release turn, where the gesture
   has already terminated and where `docs/specs/gutter-ui.md` `§2.3` row 15 rules the element is **reused
   across the write** and the affordance is **multi-shot**. **Cost: one round trip per gesture, not per
   frame.**
3. **The hydration read is ONE round trip per realm** (`§2.2` X-1).
4. **THE COST THAT WOULD BE UNACCEPTABLE, NAMED SO IT IS NOT CHOSEN:** a main-side temp tier (an IPC hop
   per observed move), a listener that patches the graph per move (an O(graph) re-render per move), or a
   store that *validates, clamps or decides* on the hot path (a second policy authority inside the
   gesture). **The plan refuses all three by rule.**

### §8.5 The risk of a second authority, and the risk of over-firing listeners

**SECOND-AUTHORITY RISK (`§7.3` `NW-2`): three named lines, each a row.** **The general test the plan
offers, so a later unit can apply it without re-deriving:** *a store tenant is admissible iff the value has
no other authority that a landed row already names — and if it does, the store is the persistence or the
working copy, and the authority stays where the row put it.* **OVER-FIRING RISK (`§7.3` `NW-3`): four
mitigations, all required.** **And the two are linked: a store that subscribes the graph to itself solves
nothing and creates both.**

### §8.6 The gate-6 (live battery) cost, sized

**`U-STORE-LAYOUT` and `U-STORE-DRAG` each owe: the `§5.U` delta matrix (≤8 U-rows, zero-row exempt ONLY
with a recorded rationale), the `§6.1` structured coverage report (each row with its instrument — a shipped
tool, a literal command, `MANUAL`, or `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` with a structural reason),
and the `§6.2` read-only audit by a party that did not author the matrix** (`docs/specs/user-flow-audit.md`
`§1`–`§4`, read this pass). **Their instruments, named honestly in advance:** the MCP CLI
(`scripts/mcp-cli.mjs` — `docs/specs/gutter-ui.md` `§5.2` leg 6 names it as *"the driver the repo actually
ships"* and records that **there is no `scripts/live-drive.mjs`** in this tree, **so the gate-supervisor
instructions' `scripts/live-drive.mjs` example does not resolve here** — that is a finding about the process
text, recorded in `§9` Q-11) reads `targets`/`html`/`dispatch`; **`npm run ui`** is the measurement leg;
and **the pointer half is `MANUAL OPERATOR`** — because the MCP dispatch surface **carries no coordinates**
(`docs/specs/gutter-ui.md` `§5.2` leg 6's reachability note and `S-d9`'s *"no later pass may claim
agent-drivable drags"*, as carried by layer 2 `§7` item 4). **A drag unit that claims `npm run ui` drove a
drag is FALSE by the spec's own ruling.**

**⟶ ANSWERED 2026-10-01 (`Q-11`) AND ANNOTATED BESIDE AT ALL THREE SITES: THE DRIVER IS NAMED PER LEG
AND THE PLAN'S OWN CITATION IS ONE OF THE THREE.** **The paragraph above quotes `docs/specs/gutter-ui.md`
`§5.2` leg 6's measurement rather than a directory read of this pass's own; the amendment replaced that
indirection with a MEASUREMENT — `scripts/` holds exactly `electron-divergence.mjs`, `electron-spawn.mjs`,
`electron-ui.mjs`, `mcp-cli.mjs` — and landed a dated bracket at each of the three citing sites:
`docs/pending.md`'s `E10` SPEC-FILED row · `docs/specs/gutter-ui.md` `§5.2` leg 6 **and** its `§5.1`
DENIED-item-6 row (two occurrences of the same citation, both bracketed) · and this plan's own `§8.6`
and `§9` `Q-11`.** **THE REAL DRIVER PER LEG: `scripts/electron-ui.mjs` for the `ui` leg ·
`scripts/mcp-cli.mjs` for the MCP route · `scripts/electron-divergence.mjs` for the divergence leg (with
`scripts/electron-spawn.mjs` as its precondition) — and the `live-drive.mjs` the gate-supervisor
instructions' clause names *"e.g."* is the FORK's driver (`../Astrographer/`), NOT this repo's.** **NO
CITED CLAUSE WAS REWRITTEN AT ANY OF THE THREE SITES, and no instrument row, exit code or count moves.**
**The instrument set for `§8.6`'s battery is therefore UNCHANGED, and the pointer half remains `MANUAL
OPERATOR`.**

---

### §8.7 THE AMENDED COSTS (2026-10-01) — the fork arithmetic, the gate-6 additions, and the `Q-11` annotations

**(1) THE FORK'S RE-VENDOR ARITHMETIC — `§8.3` IS AMENDED BY `§5.6.5`, AND THE TWO FIGURES MUST NOT BE
CONFUSED.** **`§8.3`'s as-filed line (*"`8` mechanism modules move their bytes … `7` hold their digest"*)
is SUPERSEDED: the EDGE set is `FIFTEEN` (`§5.2.6`) and the BYTE set is `TEN`** (the as-filed eight, plus
`zones.ts` and `census.ts`; **five modules gain the edge with NO byte change** — `gesture-session.ts`,
`focus-model.ts`, `gutter-affordance.ts`, `mount-invariant-guard.ts`, `layout-projection.ts` — **and
`menu-template.ts` is deferrable while latent**). **`types.ts` does NOT move** (the constants answer is a
host-side file, `Q-3`). **The host-file list, the `N = 9` conformance leg, the `PAR-1` no-new-MCP-member
clause and the four recording sites are UNCHANGED.** **THE CHECKABLE IDENTITY, PRINTED WITH ITS TERMS:
`15 edges = 10 byte-moving + 5 edge-only`, with `menu-template` counted among the ten and flagged
LATENT** (a deferrable byte move, not an absent one).

**(2) THE GATE-6 (LIVE BATTERY) COST — `§8.6`'s figure PLUS THE SLICE'S TWO SURFACES.** **`§8.6` named
`U-STORE-LAYOUT` and `U-STORE-DRAG` as the mandatory-battery units with `MANUAL OPERATOR` for the pointer
half. THIS AMENDMENT ADDS A THIRD UNIT TO THAT SET: `U-STORE-FOCUS`, whose tabs slice owns TWO authored
rendered surfaces (the landing page and the error page, `§1.7` item 6).** **Each owes its own `§5.U`
delta-matrix row, its own `§6.1` coverage report entry and the `§6.2` read-only audit — and the honest
instrument note is that BOTH pages are reachable by the MCP `targets`/`html` route** (`` `npm run mcp --
--target http …html` ``), **because they are ordinary authored nodes in the app's own mount and NOT
pointer-driven surfaces** — **so the slice's battery is instrument-reachable in a way the drag's pointer
half is not, and a parked row for either page is a STRUCTURAL park or a finding, never a default**
(`§7.3` `NW-9`). **The drag unit's own instrument note is unchanged and binding: `S-d9` still says *"no
later pass may claim agent-drivable drags"*, and a row that claims `provident.dispatch` carried a
coordinate is a FALSE RECORD.**

**(3) THE PERFORMANCE COST — `§8.4` IS UNCHANGED, WITH ONE STRUCTURAL IMPROVEMENT WORTH RECORDING.** **The
as-filed claim was *"at most three Map lookups plus one listener dispatch"* over tiers that included a
mirror; under `§2.5` all three non-security tiers are in-realm, so NOTHING about the read is worse and the
`Y-2` commit remains ONE round trip per write.** **What is new and priced: the tab slice's writes are
DISCRETE OPERATOR ACTIONS, so its crossing budget is per-action, not per-frame — and `NW-3`'s four
mitigations carry over to the slice unchanged.** **No timing figure is claimed anywhere in this section:
this pass ran nothing.**

**(4) THE SECOND-AUTHORITY TEST — `§8.5`'s general test is RESTATED HERE WITH THE SLICE'S THREE NEW
LINES.** **A store tenant is admissible iff the value has no other authority that a landed row already
names; where it does, the store is the PERSISTENCE or the WORKING COPY and the authority stays where the
row put it.** **The slice's three additions, each a "must not cross" line: (a) the ENTRY SET (the focus
holder's `entries` is no longer the authority — tier 1's tab list is, `Q-9`); (b) the FOCUS MODULE'S
REFUSAL VOCABULARY (function-internal, never passed to the store, `§1.7` item 9); (c) the GRAPH (the
authored pages are graph data; the store never authors UI, `P-E2`/`AGENTS.md`).** **Each is a row, and
each is a finding if crossed.**

**(5) `Q-11`'s THREE ANNOTATIONS — LANDED BY THIS PASS, AT THE THREE SITES, WITHOUT REWRITING ANY CITED
CLAUSE.** **`docs/pending.md`'s `E10` spec-filed row, `docs/specs/gutter-ui.md`'s `§5.2` leg 6 and its
`§5.1` DENIED-item-6 row each carry a dated bracket naming the real driver per leg** — `scripts/
electron-ui.mjs` for the `ui` leg · `scripts/mcp-cli.mjs` for the MCP route · `scripts/electron-
divergence.mjs` for the divergence leg — **and naming the fork's `live-drive.mjs` as the FORK's.** **The
finding the bracket records (unchanged from `§9` `Q-11`): the gate-supervisor instructions' mandatory
live-battery clause names *"e.g. `scripts/live-drive.mjs`"*, and that file DOES NOT EXIST in this tree
(measured: `scripts/` holds exactly `electron-divergence.mjs`, `electron-spawn.mjs`, `electron-ui.mjs`,
`mcp-cli.mjs`).** **`docs/specs/gutter-ui.md` was touched ONLY by these brackets** — no row of its state
machine was edited, least of all row 16, whose owed amendment is ROUTED to the architect (`§7.1`
`RH-2`).

---

## §9. Open architect questions

**Every decision this plan cannot make from landed text. Each: the options, the cost of each, and a
recommendation. NO DECISION IS TAKEN HERE.**

**Q-1 — THE PROCESS/REALM SPLIT.** **Options:** (a) the plan's split (`secure` main-only; `file` main with
a renderer mirror; `mem`/`temp` renderer) · (b) all four main-side · (c) `file` in main with **no** mirror
(every tier-1 read an IPC round trip). **Costs:** (a) **one IPC round trip per commit and per realm, plus a
second-holder mirror** (`NW-1`); (b) **an IPC round trip per read — which makes the architect's own drag
example unimplementable on the hot path, and makes the focus holder a main-side value where it is a
renderer wiring value today**; (c) **an async read on every pane-hover and layout read, and the architect's
`cache` reference (a live object) still cannot cross — so the read's own return shape would have to change
per call site.** **Recommendation: (a)**, with `NW-1`'s staleness row as its price. **The decisive fact:
`§1.2`'s `cache` reference cannot cross a boundary (`P-E6`), so the architect's read shape is faithful in
one realm only.**

**Q-2 — DOES THE SECURITY TIER'S ACCESS CONTROL EXTEND TO READS FROM THE RENDERER?** **Options:** (a) **no
renderer read of the tier at all** — the renderer gets a **snapshot** over the existing manual-UI channel
(the landed shape) and the generic surface refuses `secure.*` · (b) **a renderer read gated by a
capability** (a new mechanism with its own gate) · (c) **a renderer read with no gate** (the tier's data
becomes realm-wide). **Costs:** (a) **the pane cannot subscribe to security changes — it re-reads on
refresh, as it already does**; (b) **a new capability/policy surface, a new contract, and a new way for the
MCP-visible app to read what the operator set** — a `§6.4` hazard by construction; (c) **an agent-reachable
read of the token if any wiring leaks it into an MCP-visible surface** — layer 1 `§5` `A-7` exists to
prevent exactly this. **Recommendation: (a).** **And the plan's strongest form of (a), recommended for
adoption: the generic read refuses `secure.*` BY NAME (`§1.3` R-4), so the property is enforceable by a row
rather than by review.**

**Q-3 — THE IPC CHANNEL CONSTANTS' HOME (a fork-pin decision).** **Options:** (a) a **new host-side
constant file** (**proposed `src/main/store-channels.ts`**) imported by `main.ts` and the preload ·
(b) **add them to `src/shared/types.ts`** · (c) reuse an existing channel family. **Costs:** (a) **the
constant agreement becomes a host-side single-source claim needing its own row** (the `F-8` lesson applied
in advance); (b) **the project's own convention, and — UPDATED BY THE SUPERSEDING STEER — its former cost
is SPENT: `src/shared/types.ts` is now an editable module, so option (b) no longer carries a special
*"vendored byte"* penalty beyond the re-vendor the architect has already accepted (`§5.6.1`)**; (c) **refused**: the
app-graph invoke pair is **main-initiated** (layer 1 `§4.1`) so it cannot carry a renderer-originated
commit, and multiplexing onto the security channel would reach `secure.*` through a manual-UI channel's
name. **Recommendation: (a).**

**Q-4 — DOES THE FILE-STORED CACHE SUPERSEDE `NO-FOUNDATION-CONFIG-FILE-FACILITY`?** **Options:** (i) **a
supersession of clause 1** · (ii) **the row's own affirmative new-gate route, opened openly**. **Costs and
the fork consequence: `§5.1`'s table, in full.** **Recommendation: (ii)** — with the explicit warning that
**reading (ii) is available only if the architect says so**, and that **a pass which assumes it has
smuggled the facility in.**

**Q-5 — DOES THE DOMAIN STORE FOLD INTO TIER 1?** (the module registry's `records` and the per-module
`disabled` flag — `§3.1` rows 2.1-6 and 2.1-12, both marked `UNSURE`.) **Options:** (a) **both stay** · (b)
**records fold into tier 1** · (c) **`disabled` alone folds in**. **Costs:** (a) **two files persist, and
the model's *"file tracking"* facet merely tracks them** — cheap, but the centralization intent is
partially unmet; (b) **the module record is split across two files (a join) and `syncModuleRouter`'s reader
depends on both**; (c) **one boolean in a second place, with a two-file join and a re-sync ordering rule**
— and `moduleStore.setDisabled`'s **single writer site** (`src/main/main.ts` `IPC_MODULE_SET_DISABLED`,
read this pass `[H]`) must be preserved or `F-3`'s class grows. **Recommendation: (a)**, with the reason
recorded: **the two shipped files are already named as domain-specific by the very row tier 1 would
supersede, so folding them in maximizes the fork-facing consequence for no functional gain.**

**Q-6 — THE REFERENCE-NAMING GRAMMAR: WHO OWNS THE NAMESPACE, AND HOW IS A NAME KEPT STABLE?** **Options:**
(a) **the consumer owns every segment after the tier; the store ships no vocabulary and names nothing**
(the plan's `§1.3` R-1) with a **single host-side declaration table** (`R-2`/`R-3`) · (b) **the store owns a
typed schema of known references** (a registry of legal names) · (c) **free-form strings with no declaration**
(whatever a call site spells). **Costs:** (a) **the consumer must keep its own names consistent, and the
declaration table is one more artifact to keep current** — but the store cannot re-introduce the banned
mirror-class taxonomy through a name; (b) **the store would own pane/zone vocabulary — a `P-CT-1`/`H-r15`
violation, and a second authority over the consumer's own concepts**; (c) **exactly the `F-8` class: two
spellings of one name with no row pinning the agreement.** **Recommendation: (a)**, with `R-2`'s
one-declaration rule and a positive control (a second literal spelling FAILS) as the unit's rows.

**Q-7 — THE COMMIT'S EVENT COUNT (one event or two?) AND ITS ORDER.** **Options:** (a) **one event per
reference, carrying `cleared[]`, fired AFTER the clears** (the plan's `§1.5`) · (b) **two events (a clear
event + a set event)** · (c) **one event per tier** (a clear event per lower tier plus a set event per
higher tier). **Costs:** (a) **the listener must read `cleared` to know what was removed** (a slightly
richer payload); (b) **a listener that re-reads inside the notification can observe an inconsistent tier
state depending on arrival order, and a hot reference pays two dispatches per commit**; (c) **N+M
dispatches per commit — the same problem, worse.** **Recommendation: (a)**, with the ordering (clear-then-
notify) pinned, because **the model's own *"the found cache reference"* return shape implies a listener
will re-read.**

**Q-8 — IS A SESSION-LEVEL CHANGE CHANNEL WANTED?** **Options:** (a) **no** — the store's listeners are
host-side and the per-move write rides the affordance's own move turn · (b) **yes** — a `session.subscribe`
/ an `onChange` install hook. **Costs:** (a) **the store observes a *store reference*, not a gesture
event — so "a new valid placement" is defined by the consumer's write, not by the session's turn** (this is
the honest limitation, and it is **exactly the boundary the frozen surface draws**); (b) **a
FROZEN-CONTRACT CHANGE** — its own gate, a `docs/specs/gsession.md` `§2.5` amendment, a red-first row, and
the *"Nothing else exists … no subscription"* fence re-written. **Recommendation: (a).** **The frozen
surface's own sentence (*"no subscription"*) is the reason, and it is the strongest kind of reason: a
landed contract, not a preference.**

**Q-9 — IS A DECLARED CAP ON THE FOCUS HOLDER ADMISSIBLE?** **Options:** (a) **yes** — the holder keeps its
authority and gains a bounded collection, with a `focus-tool.md` `§2.1` item 6 amendment saying the
**carrier** changed and the **authority** did not · (b) **no** — the holder's uncapped growth stands
(`RH-4` unfixed) because *"the holder IS the live authority"* is read as forbidding a bound. **Costs:** (a)
**an entry-count bound must be declared and its overflow behaviour ruled (refuse the append? evict the
oldest? — an eviction policy is a decision)** and the reply's `entries[]` can become a truncated list, which
is a shape change the tool contract must state; (b) **an agent can still grow renderer state without bound,
and the reply grows with it** (layer 2 `RH-4`'s *"the answer grows with the accumulated set"*).
**Recommendation: (a) with an explicit overflow rule, routed as a working default the architect may
reverse** — because the authority clause is about **who decides** the entry set, and a cap decides **how
many**, not **which**.

**Q-10 — DOES THE PLAN TAKE ANY OF THE LEFT BEHIND HAZARDS ALONG?** (the cheapest candidates: `RH-3`'s
uncapped pane journal — a `maxJournalLength` on the pane Supervisor; `F-9`'s stale doc cell; `F-13`'s dead
`randToken`.) **Options:** (a) **none — they stay parked** · (b) **fold `F-9` and `F-13` into the units that
already touch those files** · (c) **add a seventh unit for them**. **Costs:** (a) **the parked set stays
parked and this plan's "what it fixes" stays honest but small**; (b) **scope creep inside units that are
already large, and `F-9`/`F-13` are pure doc/dead-code fixes with no gate**; (c) **an admission for a
one-line fix — the process cost exceeds the change.** **Recommendation: (a) for the hazards, and (b) for
`F-9`/`F-13` ONLY IF the architect prefers it** — with the note that **layer 1's own parking record
(`docs/pending.md` `§P`) already names the owner and the revisit condition for every one of them.**

**Q-11 — A PROCESS-TEXT FINDING, RECORDED BECAUSE THIS PASS HIT IT.** **The gate-supervisor instructions'
mandatory-live-battery clause names *"the project's live driver, e.g. `scripts/live-drive.mjs`"* — and
**that file does not exist in this tree**: `docs/specs/gutter-ui.md` `§5.2` leg 6 states it in terms
(*"**`scripts/mcp-cli.mjs` IS the project's live driver** — there is **no `scripts/live-drive.mjs`** in this
tree (globbed `scripts/*`: `mcp-cli.mjs`, `electron-divergence.mjs`, `electron-spawn.mjs`,
`electron-ui.mjs`)"*, read this pass). **Options:** (a) **the process text is annotated to name
`scripts/mcp-cli.mjs`** · (b) **a `scripts/live-drive.mjs` is created as an alias** · (c) **left as is.**
**Costs:** (a) **nothing — a one-cell annotation by the pass that owns the process text**; (b) **a new
script key reddens `tests/ui-leg-contract.test.ts`'s `L-1` row, which pins the `scripts` key set** — the
recorded hazard in `AGENTS.md` item 4; (c) **a fresh supervisor looks for a file that is not there, which
is the class of confusion this record exists to prevent.** **Recommendation: (a).**

**Q-12 — THE FOUR PARKED SEMANTICS, NOW STORE-VALUE QUESTIONS (STEER (C)).** **Options:** (a) **absorb them
as `§1.6` does** — `ZQ-1` the refusal surface (the store refuses NAMES/TIERS, never SIZES), `ZQ-2` an
**opaque caller token** as the min-vs-zero discriminator, `ZQ-3` the mapping consumer-side with a named
carrier, `ZQ-4` a location = an **opaque slot key + a caller-measured distance** — · (b) **re-admit the
parked family-side clamp unit** · (c) **leave the four semantics open** (no unit, no store value). **Costs:**
(a) **four rows spread across three units, each sharing a gate with other work** (`§7.4.1`), and a **store
grammar that must never spell `is-minimized`**; (b) **contradicts the architect's own parking**; (c) **the
fork's ask is answered nowhere, and the fork cannot proceed on the preview/ghost line.** **Recommendation:
(a)**, with (a)'s four recommendations as written at `§1.6`.

**Q-13 — THE SCOPE OF THE QUALIFIER *"for owned data/settings"* — THE PLAN'S ONE UNCLASSIFIED ROW.**
**Options:** (a) **the qualifier is RESTRICTIVE** — only modules that own data/settings gain an edge (the
plan's reading: **ten edges; five kernels hold `NO EDGE`**) · (b) **the qualifier is INCIDENTAL** — every
shared module holds a store handle so the paradigm is uniform (**five more edges**, five more modules whose
bytes move, a larger re-vendor at `§5.6.1`, and five more registers re-grained) · (c) **decided per module
by the architect in a table**. **Costs:** (a) **the five kernels' answers stay functions of their
arguments — which is what keeps the `V-13`/`A-19` one-authority closure true** (`§7.4.2`), at the cost of a
less uniform paradigm; (b) **uniformity, paid for with five more moving modules AND with an ambient read
path into modules whose whole contract is *"the answer is a function of its arguments"*** — under (b),
`§5.9` rows 1–5's compatible classifications must be **re-classified as supersessions**, and the `A-19`
probe's extension becomes mandatory rather than prudent; (c) **precision, at the cost of a
fifteen-row architect decision.** **Recommendation: (a)** — **and THIS IS THE FINDING the supervisor's rule
demands be recorded rather than passed: the plan CANNOT classify the architect's intent from landed text,
so the intent is filed as a question, not assumed.**

**Q-14 — WHO WRITES THE FORK-FACING RECORDS, AND WHEN.** **Options:** (a) **one documentation pass after
`U-STORE-MODULES`** · (b) **each unit writes its own `docs/FORKER.md` delta as it lands** · (c) **the
architect's own pass.** **Costs:** (a) **one file touched once, with a coherent diff — but the fork's
readers get a stale file until that pass runs, and `docs/FORKER.md` is the fork's orientation document**;
(b) **fresh at every gate, at the cost of the repo's own convention that this file's carries are recorded
with an owner and gates no unit** (its `OWED`-marker practice); (c) **the cleanest authority, at the cost
of the architect doing documentation work.** **Recommendation: (a), with the obligation recorded as `OWED`
at `docs/pending.md`'s fork-request region in the same pass `U-STORE-MODULES`' spec is filed** — because the
fork's re-vendor should not begin against a half-updated file.

---

### §9.1 THE DECIDED LEDGER (2026-10-01) — all fourteen questions answered, each with its cost, and ONE genuinely open question

**WHAT THIS SUBSECTION IS.** **The fourteen subsections below (`Q-1`…`Q-14`) are the plan's AS-FILED open
questions, each with its options, its costs and a recommendation. THE ARCHITECT HAS ANSWERED ALL
FOURTEEN, AND THIS TABLE IS THE DECIDED RECORD: each question's answer, the section that now carries it,
and the cost the answer BOUGHT.** **The as-filed text above is UNCHANGED (`RCA-8(d)`: a question's own
options-and-recommendation block is the reasoning that led to the decision, and it stays as the record of
what was weighed).** **The `§0` preamble's `A-1`…`A-14` block is the one-line form; this is the ledger.**

| Q | The question | **THE ANSWER TAKEN** | Where it lands | **THE COST THE ANSWER BOUGHT** |
| --- | --- | --- | --- | --- |
| **`Q-1`** | the process/realm split | **REVISED: tier 1 `file` is RENDERER-OWNED and written through a MAIN-SIDE channel; `mem`/`temp` in the renderer; `secure` main-only; NO MIRROR** | **`§2.5`** (+ the annotated `§2.1`/`§2.2` cells) | a channel with the atomic/`fsync`/recovery duty moved into it; a changed BOOT ORDER; `NW-1` deleted; `Y-1`/`Y-2`/`Y-3` replace `X-1`/`X-2`/`X-3` |
| **`Q-2`** | does the security tier's access control extend to renderer reads? | **NO — the renderer never reads tier 4**; the snapshot + the manual-UI channel + `maxJournalLength` are kept, and any `read`/`subscribe` on `secure.*` is a TYPED REFUSAL | **`§3.8`** (unchanged, its three forbidden read paths stand) | the pane cannot subscribe to security changes — it re-reads on refresh, as it already does |
| **`Q-3`** | the IPC channel constants' home | **A HOST-SIDE FILE SHARED BY `main` AND THE PRELOAD — `src/main/store-channels.ts` (PROPOSED) — and NOT `src/shared/types.ts`** | **`§2.4`** option (a); **`§5.6.5`** | the channel-name agreement becomes a host-side single-source claim needing its own row (the `F-8` lesson, applied) — **and NO vendored byte moves** |
| **`Q-4`** | does the file-stored cache supersede `NO-FOUNDATION-CONFIG-FILE-FACILITY`? | **YES — READING (i), THE EXPLICIT SUPERSESSION, with a NEW ACTIVE row beside the old one and the old row kept visible with a dated `SUPERSEDED` marker** | **`§5.1`; `docs/decisions.md` (two new ACTIVE rows, THIS PASS)** | the row's clause 1 is superseded; **the fork-facing `### PERSISTENCE` block is OWED a re-write** (`docs/FORKER.md` §4, `Q-14`'s pass); `S-d4`/`S-d8`#4/`H-r16` are untouched as text **and stay binding for every OTHER store** |
| **`Q-5`** | does the domain store fold into tier 1? | **YES — the module registry's RECORDS and the per-module `disabled` flags MIGRATE into the settings file** | **`§3.9` item (iii)**; `§3.1` rows 2.1-6/2.1-12 annotated | a five-step migration with a one-boot legacy window; the SHA-256 re-verification re-homed; `IPC_MODULE_SET_DISABLED` preserved as the single writer |
| **`Q-6`** | the naming grammar's ownership & stability | **OPTION (a) — the consumer owns every segment after the tier AND the store owns a DECLARED NAME REGISTRY (a schema) that REFUSES undeclared, double-declared, wrong-tier, malformed and reserved-name writes** | **`§1.3` `R-6`/`R-7`; `§1.8`** | the registry is a **SECOND CONTRACT SURFACE** with its own eight-row failure table; `NW-6` names its cost |
| **`Q-7`** | the commit's event count and order | **OPTION (a) — ONE clear-then-notify event per affected reference, after the higher tier accepted the write, carrying `cleared[]`** | **`§1.5`** (confirmed as filed) | the listener must read `cleared[]` to know what was removed — **and `cleared[]` becomes part of the event's contract** |
| **`Q-8`** | is a session-level change channel wanted? | **NO — reading (i): NO member is added to the frozen `gsession.md` `§2.5` surface; the paradigm lands at the composition boundary and on the store's own `subscribe`** | **`§5.4`** | the honest limit stands: the store observes a REFERENCE, not a gesture event — **which is exactly the boundary the frozen surface draws** |
| **`Q-9`** | is a declared cap on the focus holder admissible? | **SUPERSEDED BY THE TABS MODEL — the holder STOPS BEING THE AUTHORITY; `RH-4` is answered by the slice (a persisted list with a first-class removal path and a reserved non-removable entry), NOT by a cap** | **`§1.7`; `§7.1`** | the entry set is bounded **by construction**, not by a numeric cap — **and `NW-7`/`OPEN-1` carry the residual (a persisted, unbounded-by-construction list)** |
| **`Q-10`** | does the plan take any left-behind hazards along? | **YES — THREE: `RH-1` folds into `U-STORE-CORE`'s generation lifecycle; `RH-3` is taken (the pane journal's cap + the per-reply `refreshDebug` burst stops); `RH-2` is taken WITH ITS CONTRACT GATE.** `RH-5`/`RH-7`…`RH-11` stay tracked with their falsifiers | **`§7.1`; `§6.5`** | `RH-2`'s fix **supersedes `gutter-ui.md` §2.3 row 16** — **an amendment ROUTED to the architect, not performed**; the tallies become `5` fixed / `6` left |
| **`Q-11`** | the citation drift (`live-drive`) | **OPTION (a) — ANNOTATE BESIDE AT ALL THREE SITES**, naming the real driver per leg and the fork's `live-drive.mjs` as the FORK's; no script is created | **`§8.7` item (5), landed in `docs/pending.md` + `docs/specs/gutter-ui.md`** | nothing was rewritten — **and the process text's own example stays unresolved in this tree, which is the finding** |
| **`Q-12`** | the four parked semantics | **OPTION (a) — ABSORBED as `ZQ-1`…`ZQ-4`**, with the store refusing NAMES/TIERS (never sizes), an opaque caller token as the min-vs-zero discriminator, the mapping consumer-side, and a location = an opaque slot key + a caller-measured distance | **`§1.6`** (confirmed as filed) | four rows spread across three units, **each sharing a gate with other work** — the questions are re-homed, not smaller |
| **`Q-13`** | the scope of *"for owned data/settings"* | **OPTION (b) IS TAKEN — ALL FIFTEEN shared modules adopt the paradigm**; the five kernels gain `EDGE-READ` and the ambient-read risk becomes a HARD DESIGN ROW | **`§5.2.6`; `§5.6.5`; `§5.9.1`** | five more modules' bytes/contracts/registers move; the fork's edge set becomes fifteen (by ten bytes); `A-19`'s fifth question becomes MANDATORY; **`NW-4` stops being a footnote** |
| **`Q-14`** | who writes the fork-facing records, and when | **OPTION (a) — ONE documentation pass AFTER `U-STORE-MODULES` lands, recorded as OWED now**, with the owning pass and the files named | **`§5.6.4`; `§6.5`** | the fork's readers get a stale `docs/FORKER.md` until that pass runs — accepted, because the re-vendor should not begin against a half-updated file |

**⟶ `OPEN-1` — THE ONE GENUINELY OPEN QUESTION THIS AMENDMENT LEAVES, NAMED AS OPEN AND NOT INVENTED
TO LOOK THOROUGH.** **THE QUESTION: does the persisted tab list (`file.tabs.*`, `§1.7`) carry a DECLARED
CAP, or does the close verb plus the reserved landing entry suffice as the only retention control?**
**WHY IT IS GENUINELY OPEN RATHER THAN ANSWERED BY THE SLICE:** `Q-9` was answered by *removing the
authority*, not by ruling a bound (the answer's own words: the slice makes the list **unbounded but
prunable**), so **the model now carries its first PERSISTED, unbounded-by-construction collection** — and
**a cap, if owed, is a new first-class constraint with its own declared outcome (`REPAIR` or `REFUSE`),
which is a design decision and not a consequence of anything already decided.** **WHAT IT BLOCKS: it does
not block the plan and it does not block the slice's contract — it is a `U-STORE-FOCUS` CONTRACT clause,
and its absence is a declared position (no cap), not a gap.** **ITS TWO OPTIONS, WITH COSTS: (a) NO CAP —
pruning is the operator's, the landing entry guarantees non-emptiness, and the cost is `NW-7`'s unbounded
persisted growth; (b) A DECLARED CAP as a second constraint — the cost is a new failure mode (`NW-8`(c)'s
cascading-repair class) and a rule for which entry is pruned, which the store may not choose (the caller's
`file.tabs.order` must).** **REVISIT CONDITION (positive and named): the first operator report of a tab
list longer than the tabs ever opened, or the slice's own live battery observing `file.tabs.order` growing
across a restart with no close action.** **OWNER: the ARCHITECT; carried by `U-STORE-FOCUS`'s contract.**

**AND WHAT IS *NOT* OPEN, STATED SO THIS LEDGER IS NOT READ AS LEAVING MORE LOOSE THAN IT DOES.** **The
four `ZQ` semantics are answered (`§1.6`); the twelve remaining `RH` hazards are TRACKED with their
falsifiers, which is a status, not an open question; the `F-1`…`F-15` findings have `§7.2`'s verdicts;
the five-seam/MCP-parity constraints (`§5.5` `PAR-1`..`5`) are compatible additions with rows; **the
two routed amendments (`mcp-endpoint.md` §3.8 + `focus-tool.md`'s refusal rows, and `gutter-ui.md` §2.3
row 16) are ROUTED GATES, not open questions — the architect's answer is what they wait for, and each
owns its own gate**; and **`§5.9.1`'s unread-row sweep** is an owed documentation duty, not a design
question.** **NO NEW OPEN QUESTION HAS BEEN ADDED HERE.**

---

**⟶ THE ANSWERED-DECISIONS AMENDMENT PASS (2026-10-01) — ITS OWN PROVENANCE, STATED AS `§10`'s FORM
REQUIRES.** **WHAT IT READ (first-hand, this pass): this document IN FULL (all `1749` filed lines, section
by section, before any edit); `docs/specs/foundation-app-data-model.md` `§2`/`§5`/`§7` **as the plan
carries them** (not re-read at their own lines — stated so no citation is over-claimed);
`docs/specs/foundation-app-data-model-retention.md` `§6` **IN FULL at its own text** (all eleven `RH-*`
rows with their retaining references, falsifiers and the honest ranking note — **the `RH-1`/`RH-2`/`RH-3`
clauses this pass folded in are that section's own words, quoted with its ownership**);
`docs/specs/mcp-endpoint.md` `§3.8` **in full at its own text**; `docs/specs/gsession.md` `§2.5` **in
full**; `docs/specs/gutter-ui.md` `§2.3` rows 15/16 and `§2.5` **at their own cells**; `docs/specs/
gutter.md` `§2.3` item 1 and `§4.4` `S-PURE-4`; `docs/decisions.md`'s `ACTIVE` region's named rows
(`NO-FOUNDATION-CONFIG-FILE-FACILITY` in full, `ZONE-SIZE-DOMAIN-…`, `GSESSION-DELEGATE-SURFACE-…`,
`E10-SINGLE-SINK-CHANNEL`, `FOCUS-UI-ONLY-MCP-TOOL`, `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`,
`AUTONOMY AFTER SPEC APPROVAL`) and the region's own structure (the row/blank-line shape and the placement
notes); `docs/FORKER.md` `§4`'s `### PERSISTENCE` block, its seam blocks and its return notes;
`docs/pending.md`'s `E10` spec-filed row and its fork-request region's headers; and **four `src/**` reads
that are this pass's own `[H]` evidence: `src/renderer/renderer.ts`'s `resolveForHolder`/`answerForHolder`/
`focusRoute` region (`:295-345`), `src/renderer/runtime.ts`'s `elementForNodeId` (`:304` and its total
contract), `src/main/main.ts`'s tier-4 construction site, and `scripts/`'s own file list (the `Q-11`
measurement).**

**WHAT IT DID *NOT* READ OR RUN, STATED SO NOTHING IS OVER-CLAIMED.** **It did NOT re-read** the family
specs' `P-*`/`P-CT-*` tables beyond the rows the plan's `§5.9` already cites (**so `§5.9.1`'s owed sweep
is a real gap, not a formality**), `tests/**`, `node_modules/provident-ssr/**`,
`../Preempt-Providence/**`, `../Astrographer/**` (**no file was written under the fork's tree, and none
was read for this amendment**), and `docs/specs/focus-tool.md`'s rows in full (**its refusal rows are
cited as the routed amendment's target, NOT re-derived here**). **IT RAN NOTHING: no `npm test`, no
`tsc`/`typecheck`/`typecheck:tests`, no build, no `npm run ui`, no `divergence`, no battery, no Electron
boot, no MCP session, no GC or memory measurement — and, per `AGENTS.md` item 4, a docs-only change does
not trigger the trio.** **Every figure in this amendment is a file read or a figure quoted from a named
section with its ownership stated; NO TIMING FIGURE AND NO SUITE FIGURE IS CLAIMED ANYWHERE IN IT.**

**THE DATE.** Still **2026-10-01** per the architect's instruction, and **the same convention as the
filing pass applies: this document's date is a filing convention, not a claim about the tree's state**
(the tree carries rows dated later — `docs/pending.md`'s `§N` header's `2026-10-04`, and layer 1's `F-15`
records the same observation about itself).

**THE LAYER OF THIS AMENDMENT.** It is a **plan / documentation record**: **no code-bearing surface, no
register, no `§5.U` matrix and no `§6.1` report are emitted by it**, under the same recorded zero-row
exemption the filing pass invoked (`docs/specs/user-flow-audit.md` `§2`; `AGENTS.md` item 11(g)'s
`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`: doc-only units are outside gate 11). **The units `§6.5` proposes
are NOT exempt, and the TAB SLICE'S TWO AUTHORED SURFACES are explicitly NOT exempt — they owe their own
live rows (`§7.3` `NW-9`).**

**AND THE ONE THING THIS AMENDMENT MUST NOT BE READ AS.** **It still authorises nothing.** **The fourteen
answers are the ARCHITECT'S and are folded in; the SIX UNITS remain PROPOSALS; the LEDGER STAYS
`21 DONE / 0 open`; and `RCA-8(f)` admits no successor row — only the architect admits rows.** **The two
decision rows this pass lands in `docs/decisions.md` record the ARCHITECT'S RULINGS, not this pass's
decisions.**

---

## §10. Provenance

**⟶ READ THE BLOCK IMMEDIATELY ABOVE THIS HEADING FIRST IF YOU ARE AUDITING THE 2026-10-01 AMENDMENT: it
is THAT PASS'S OWN PROVENANCE BLOCK (what it read, what it did not read, what it ran — nothing) and it is
placed there because it belongs to the amended document's tail rather than to this filing pass's record.
The subsection below is the FILING pass's own provenance and stands UNCHANGED.**

**WHAT I READ, AND HOW (`[H]` and `[T]` file reads only — no measurement).**

- **The two audit layers, IN FULL:** `docs/specs/foundation-app-data-model.md` (581 lines — its `§1` boot
  chain, `§2`'s five storage-map tables **row by row**, `§2.6`'s 19-module census, `§3`'s authority table,
  `§4`'s four boundaries, `§5`'s absences `A-1`…`A-9`, `§6`'s worked "where would a new value live" case,
  `§7`'s `F-1`…`F-15`, `§8`) and `docs/specs/foundation-app-data-model-retention.md` (674 lines — its `§1`
  lifetime table, `§2`'s re-derivation ledger, `§3`'s listener inventory, `§4`'s unbounded-growth audit,
  `§5`'s four flows, `§6`'s `RH-1`…`RH-11`, `§7`, `§8`).
- **The specification sections this plan builds on, read at their own sections/rows:** `docs/specs/
  mcp-endpoint.md` (`§5` process layout, `§6.4` **in full**, `§3.7`'s heading set, `§7`'s pins `P-E1`…`P-E9`,
  `§8`, `§9`'s verification list); `docs/specs/gsession.md` (`§2.5` **in full** — the eleven numbered items
  and the *"Nothing else exists"* fence, `§2.6`'s sibling table); `docs/specs/gutter-ui.md` (`§2.3`'s state
  machine + rows 1–16, `§2.5` **in full**, `§3.1`'s `M-19`, `§3.2`'s `F-13`, `§3.3`'s `I-10`/`I-11`,
  `§3.4`'s `R-1`, `§5.2` **in full** — the seven legs, the `[U]` rows, the reachability note);
  `docs/specs/user-flow-audit.md` (`§1`–`§4` **in full** — the `§7.1` predicate's two limbs and its
  zero-row exemption, the `§6.1` fields and the six falsifiable clauses, the `§6.2` duties);
  `docs/specs/zones.md` (its `§0` ruling 6 / `§2.2`'s `P-3`/`P-4`/`P-5`/`P-6` / `§3.3`'s `I-6`/`I-8`/`I-10` /
  `§3.4`'s `R-2`/`R-3`/`R-6`/`R-7` rows); `docs/specs/census.md` (`§0` ruling 5/6 rows, `§2.5`'s geometry
  boundary); `docs/specs/container.md`'s prohibition rows as layer 1 cites them (`I-6`, `R-6`, `P-CT-1`);
  `docs/specs/focus-tool.md` / `docs/specs/focus-model.md` **as layer 1 and `docs/FORKER.md` carry them**
  (I did not re-read those two files at their own sections — stated so no citation is over-claimed).
- **The decision rows this plan must confront, read at their own rows:** `docs/decisions.md`'s
  `NO-FOUNDATION-CONFIG-FILE-FACILITY` (**in full, its seven clauses**) · `E10-SINGLE-SINK-CHANNEL` (**in
  full**) · `GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAMP-COMMIT-LAYER` · `GSESSION-DELEGATE-SURFACE-IS-FROZEN-
  FOR-E3-E4` · `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE` ·
  `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` (as its own discharge note carries it) ·
  `SHELL-CHROME-PANES-ZONES-IN-SCOPE` · `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` ·
  `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE` (**in full, its five
  clauses**) · `E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY` · `UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING` ·
  `AUTONOMY AFTER SPEC APPROVAL` · `E3-CAPTURE-OPT-IN-IS-STILL-OWED…` (as the freeze's priced alternative).
- **`docs/FORKER.md`** — read in full (all 449 lines: `§1` what ships, `§2` the dependency map, `§3` the MCP
  surface and the `provident.focus` block, `§4`'s reshape digests and the fork-facing carry blocks
  **including the `### PERSISTENCE`, the host-container-source, the preview-channel and the gutter-seam
  blocks**, `§5` the archival convention, `§6` the process, `§7`).
- **`docs/pending.md`** — its section map, `§P` **in full** (the parked `F-1`…`F-15` rows, each with owner
  and revisit condition) and the fork-request region's headers (`§M`, `§N`, `§O`'s headings).
- **`docs/next-steps.md`** — the ledger's closure region: **`21 DONE / 0 open` UNITS = `21` units**, the
  `RCA-8(f)` no-successor-row rule, the standing non-unit carries, and the `NOTHING IS IN FLIGHT` heading
  (all read at their own lines).
- **`AGENTS.md`** — items 3–11 (TDD order, the trio **plus the additive `typecheck:tests` leg**, specs as
  contracts, the archival loop, the proposal-review gate, the delegation gate, item 10a's two return
  points, item 10d's per-unit documentation review, item 11's typed register and its zero-row exemption),
  and `RCA-1`/`RCA-2`/`RCA-3`/`RCA-5`/`RCA-6`/`RCA-8(a)`–`(f)`/`RCA-12` (the layer rule).
- **`src/**`, read by this pass (so the plan's `[H]` claims are mine, not quoted):** `src/main/main.ts` **in
  full** (189 lines — the boot chain, the two stores' paths, the four `ipcMain.handle` + three `ipcMain.on`
  registrations, the `980 × 720` window literals, the stdio disconnect watchers, the absence of any `Menu`
  reference); `src/main/security-store.ts` **in full** (85 lines — `sanitize`, the **non-atomic**
  `persist()`, the swallowed failure, the single `set` site); `src/main/module-store.ts`'s import set,
  `load`, `persist` (**the atomic `.tmp` + `renameSync`**, its `F1 (adversarial)` comment) and its record
  interface; `src/main/mcp-server.ts` at the `RendererBackend` option/field/timer region (**the three
  timeout literals `30000`/`60000`/`1_000_000` as constructor defaults**); `src/renderer/renderer.ts` **in
  full** (442 lines — `MUTATING_METHODS`, `startGutterAffordance`'s five roles, the `writes` array and the
  **discarded** handle, the `applyPreview` write, the commit seam, `handleRequest`'s switch and the notify
  predicate, the focus holder and its route, `main()`, and the inert `themeWiringRole`);
  `src/renderer/runtime.ts`'s **declared surface** (the field list and the method list — not a full read);
  `src/shared/types.ts`'s `IPC_*` constants; and `wc -l` over `src/main/*.ts src/renderer/*.ts
  src/shared/*.ts` (the module-size census used only to state what I did and did not read in full).

**READ FOR THE SUPERSEDING STEER (added in the same pass, after the steer arrived).** To classify
`§5.9`'s rows **at their own text** rather than from an aggregate, this revision read: `docs/specs/zones.md`
`§2.2`'s **`P-1`** and **`P-2`** rows (in full, at their own lines) beside the `P-3`/`P-4`/`P-5`/`P-6` rows
already read; `docs/specs/census.md` `§2.2`'s **`P-1`** (with its `ADV-CN-5` amendment), **`P-3`**, and its
**`A-19`** probe row + the `V-13` remedy text at `§1` items 2/3 and `I-2`/`I-4`; `docs/specs/container.md`'s
**`P-CT-1`**, **`P-CT-13`**, **`I-2`** and `§3.4` **`R-1`**; `docs/specs/gutter.md`'s **`§2.2` `P-9`/`P-10`**
rows (as the grep-rendered table carries them, not re-read as prose). **Their rows are cited in `§5.9` by
their own ids.**

**AND WHAT I DID NOT READ OF THAT FAMILY, STATED SO `§5.9`'S COVERAGE IS NOT OVER-CLAIMED.** **`zones.md`'s
`P-1`…`P-6` are six rows and all six were read; `census.md`'s `§2.2` carries more than the two rows cited
here (its `P-2`, `P-4`, `P-5`… are **NOT read by this pass**), and `container.md`'s `P-CT-*` table carries
more than the two rows cited (its `P-CT-2`…`P-CT-12` are **NOT read**), and `gutter.md`'s `P-1`…`P-8` are
**NOT read**. **Consequence for `§5.9`: its rows are the ones the supervisor named plus the ones this pass
could read at their own text; A ROW OF THOSE TABLES THAT WOULD ALSO BE AFFECTED BUT WHICH THIS PASS DID NOT
READ IS A GAP, and the honest form is `UNCLASSIFIED — NOT READ` rather than an inferred verdict.** **The
gate-1 pass that rules `§5.9` must sweep the remaining `P-*`/`P-CT-*` rows of those three tables and append
them to the table.**

**WHAT I DID **NOT** READ — STATED SO NO CLAIM IS OVER-REACHED.**
1. **THE FORK'S TREE (`../Astrographer/**`) — NOT TOUCHED, NOT READ, NOT CITED FROM.** Every fork-facing
   fact in `§5.6`/`§8.3` is **this repo's own record of it** (`docs/FORKER.md`, `docs/pending.md`), as the
   brief requires. **Consequence: the "does the pin cover all of `src/**` or only the mechanism modules?"
   question is ANSWERED AS A TWO-CASE BRANCH, not as a fact** (`§5.6`) — the fork's own pass owns the
   answer.
2. **`node_modules/provident-ssr/**` — NOT READ BY THIS PASS** (layer 2 read the engine dist; **I did
   not**, so every engine-internal claim here is **quoted from layer 2 with that ownership**, e.g. the
   `finalizeHooks`/`dispose`/dedup-cap facts).
3. **`../Preempt-Providence/**` — not read.**
4. **`tests/**` — not read, and NO TEST WAS RUN** (this is why no `[T]` figure in this plan is a
   measurement: the `[T]` rows I propose are **rows a TestWriter would author**, never rows I executed).
5. **`scripts/**` — read only through `docs/specs/gutter-ui.md` `§5.2` leg 6's own statement about which
   scripts exist** (so the `scripts/live-drive.mjs` finding in `§9` Q-11 is **a spec's measurement quoted,
   not my own glob** — stated exactly).
6. **`archive/**` — not read** (it does not ship; `docs/FORKER.md` `§5`).
7. **The full spec corpus** (~40 600 lines by layer 1's own count): read **at the sections and rows this
   plan cites**, never exhaustively. **In particular I did not re-read** `docs/specs/gutter.md`,
   `docs/specs/relocate.md`, `docs/specs/gsession.md` outside `§2.5`/`§2.6`, `docs/specs/container.md`,
   `docs/specs/census.md`, `docs/specs/slothost.md`, `docs/specs/listhost.md`, `docs/specs/projection.md`,
   `docs/specs/theme.md`, `docs/specs/menulib.md`, `docs/specs/ci-ui-leg.md`, `docs/specs/ci-divergence-leg.md`,
   `docs/specs/mcp-security-gate.md`, `docs/specs/mcp-server-gate.md`, `docs/specs/focus-tool.md`,
   `docs/specs/focus-model.md`, `docs/specs/secure-panels.md`, `docs/specs/runtime-host.md`,
   `docs/specs/module-*.md`, `docs/specs/provident-electron-shell-chrome-handoff-review.md` (the `S-d*`/`H-r*`
   clauses are cited **as layer 1, layer 2 and `docs/FORKER.md` carry them**), `docs/specs/
   zone-gesture-preview-and-collapsed-drop-target-*.md`, `docs/specs/foundation-no-config-file-persistence-
   review.md`, `docs/defects.md`, `docs/HANDOFF.md`, `docs/guide/**`, `docs/skills/**`.
   **Where that matters, the citation names the carrying document** (e.g. *"as carried by `docs/FORKER.md`
   `§4`"*) **so a reader can see the indirection rather than mistaking it for a first-hand read.**
8. **`docs/decisions.md` in full is ~532 lines of very long rows** — I read the **named rows** (`§9`'s list)
   and the ACTIVE-region headers, **not every row**. **Consequence: a landed row I did not read could
   contradict this plan, and a gate-1 pass is where that surfaces** — which is why `§6.4` puts the
   admission and the conflicts FIRST.

**THE HONEST HEADLINE, REPEATED BECAUSE IT IS THE MOST IMPORTANT SENTENCE IN THIS DOCUMENT.** **I ran no
suite, no leg (`npm test`, `npm run ui`, `npm run divergence`, `npm run battery`), no `npm run typecheck`,
no `npm run typecheck:tests`, no `npm run build`, no Electron boot, no MCP session, no battery, no GC or
memory measurement, and NO `git` COMMAND.** **Every figure in this document is my own file read or a figure
quoted with its source named; `§8.4`'s performance section therefore contains NO TIMING FIGURE, because a
timing figure would be a `[U]`-layer measurement and this pass took none.** **No claim here is
assembled-app evidence**, and **a later pass that reports any part of this plan as "the app works" from a
node green would be breaking `RCA-12`'s layer rule.**

**THE DATE.** Filed **2026-10-01** per the architect's instruction. **`docs/pending.md` carries rows dated
later than that** (`§N`'s `2026-10-04` header, and layer 1's `F-15` records the same observation about
itself): **this document's date is a filing convention and not a claim about the tree's state.**

**THE LAYER OF THIS DOCUMENT.** It is a **plan / research record**: **no code-bearing surface, no register,
no `§5.U` matrix and no `§6.1` report are emitted** — the **explicit, recorded zero-row exemption** of
`docs/specs/user-flow-audit.md` `§2` (*"a measurement/documentation record … for such a unit no `§5.U`
matrix and no `§6.1` report are emitted, and the exemption is RECORDED in the unit's own spec with its
reason"*), which is the exemption class `AGENTS.md` item 11(g) names by row name
(`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`: doc-only units are outside gate 11). **The units this plan
proposes are NOT exempt** — `§8.2` states their register obligation, and **the exemption here belongs to
THIS DOCUMENT, not to them.**

**AND THE ONE THING THIS PLAN MUST NOT BE READ AS.** **It authorises nothing.** Not a unit, not a ledger
row, not a store, not a file, not a channel, not a spec, not a register and not a supersession. **Every
"moves into store N" cell in `§3` is a PROPOSAL awaiting the architect's admission** (`§6.4`), and **the
one row this plan must confront — `NO-FOUNDATION-CONFIG-FILE-FACILITY` — is left exactly where it is, with
both readings and their costs stated and neither taken.**
