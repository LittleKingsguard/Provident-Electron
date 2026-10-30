# L2 — `secure-panels`: the behaviour

- **Layer:** L2 · **Unit:** `secure-panels` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 2 is read through this one: §7's tier-4 sentence is replaced by the measured behaviour — a closed tier stops a reader, not a writer (`src/main/settings-surface/index.ts:28`) — and `ASM-L2-9` is re-stated to match (§7, §8). Rev 2: §7's "the roster is the table" no longer paraphrases the pane's declaration, it points at `docs/L3/secure-panels/signatures.md` §1-§2.2. · **Status:** DESIGN — the answer set L1 §4.3 fixes, stated at this layer's grain: the state before, the act, the state after, and the observation each of `P-1`…`P-7` takes of it
- **Inputs:** `interface.md` §1-§9 (the arrangement, S-1…S-7, the surface, the census, R-1…R-7); `docs/L1/secure-panels.md` §1/§2/§4 (the goal, the defect, the rows), §5 (what does not change), §6 (the marked reality); `persistence.md` §1-§4 (the bytes behind P-5/P-6); `tests/integration/secure-panels/{roster,persistence}.test.ts` read as the battery's own statement of what it can and cannot observe; D-5, D-11, D-16, D-17, D-19, D-22, D-23, D-26, D-30, D-31, D-35, D-37, D-40; the tree at this head
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `docs/L1/secure-panels.md` §4.3's row of that number and every claim below is one of those rows can observe; `S-n` is `interface.md` §3's probe; a `file:line` is this head's dated reading (D-28)

## 1. The answer set, at the grain of one operator gesture

| State supplied | The act | The answer the live leg takes |
|---|---|---|
| a scratch profile whose grant arrives through the retired name's import-once path, `data` **not** among it (`persistence.md` §4; P-3) | none — boot and first refresh | the pane paints six `[data-group]` rows, the `data` row off; `tools/list` carries no `provident.data.*` name (P-2, P-3) |
| the same | one click on the rendered `data` row | the row on, the status line naming `data`, `tools/list` gaining exactly the five `provident.data.*` names (P-4) |
| a restart on the **same** profile | none — boot and first refresh | the `data` row on at the first painted carrier state, the status line naming `data`, the instance's file carrying the grant, `tools/list` carrying the five names (P-5) |
| the same, after the restart | one click on the same rendered row | the row off, the five names gone, the record no longer carrying `data` (P-6) |
| any of the above | the leg's read of the tree and of the MCP surface | the gate declares six groups and both live copies admit them (P-1); the five landed rows read what they read before, and no MCP endpoint resolves a pane node (P-7) |

- **The set difference is the claim, never a count:** P-4 and P-6 compare the `tools/list` name sets before and after, because a count restated outside `brief.md` §6 is the drift D-26 exists to stop (`src/main/security.ts:38-42`; D-11, D-26).

## 2. The rendered row, before and after

| Paint | `data-on` (rendered attribute) | Row text | Where it comes from |
|---|---|---|---|
| the authored envelope, before any bridge answer | `"false"` — authored in the data | the label table's entry, with no mark | `paneEnvelope()` (`src/renderer/secure-panels.ts:171-177`) |
| after the first carrier answer | `"true"` iff the carrier's `enabled` names the group, else `"false"` | `☑`/`☐` + that entry, one `content` write | `syncConfig`'s `toggle:` arm (`:545-549`) |
| after a click settles | the flipped value, re-read from the carrier | the flipped mark, re-composed from the carrier | the same arm, over a `refresh()` this click caused (`:486-510`) |

- **The pane owns no state of its own:** `data-on` is written from `cfg.enabled.includes(g)` and never from the pane's prior value, so a click that the store refuses repaints the row it had (`:545-549`; the `D-vi` shape at `:322-332`).
- **The authored `"false"` is the only state the pane holds before an answer,** and it is the landed shape of the group rows — not the exclusion control's silence (which declares no state member at all, `:243`). No row of this unit asserts that pre-answer paint — P-2 and P-3 read after the first carrier answer (P-2, P-3) — **and neither does the battery**: `paneEnvelope()` is module-private and the shim's only paint follows a `refresh()`, which overwrites the authored `false` from the carrier (`interface.md` §7).
- **The sixth row is indistinguishable in kind from the five:** same `type`, same class, one generated handler name, one `[data-group]` attribute — which is what makes P-2's set comparison the whole of its drift check (P-2; L1 §5, `brief.md` §2).

## 3. What one click does, in order

1. the rendered row's `click` reaches the pane's `DomAdapter` and becomes a pane-graph dispatch — the production path, with only the event's origin synthetic (`src/renderer/secure-panels.ts:366,385-397`; L1 §4.2).
2. the **one shared** `TOGGLE_BODY` reads the group from the node's own `data-group` and the direction from its own `data-on`, then issues **one** call: `security.set({ groups: [g] })` when off, `security.set({ disable: [g] })` when on (`:135-142`).
3. the call crosses `IPC_SECURITY_SET` into `settingsSurface.set(patch)` (`src/main/preload.ts:108-110`; `src/main/main.ts:338`), which composes the pair patch and writes **one** `file`-tier record (`persistence.md` §1, §5; D-17).
4. that write's committed delivery re-patches the gate inside the surface's subscription, so the gate holds the new grant before the answer is minted (`src/main/settings-surface/index.ts:102-125`; D-17).
5. the DomAdapter's flush re-renders and `refresh()` re-reads the carrier, so the row and the status line paint the **carrier's** answer, not the click's intent (`src/renderer/secure-panels.ts:385-397,486-510`).
6. the gate's registered name set moved, so `tools/list` — a second, independent reading — answers the new set (`src/main/security.ts:38-42`; P-4).

- **One gesture, one write:** no second channel call, no second store verb, and no `RpcMethod` member is involved anywhere in the chain (`interface.md` §4; D-18).
- **A click with no bridge returns silently:** the body's `!s` guard is the first statement, so a plain page throws nothing and writes nothing (`src/renderer/secure-panels.ts:135-142`; `brief.md` §2).
- **A click carries no group of its own:** `TOGGLE_BODY` takes the group off the node it runs on, so the sixth row needs no per-group body and no second handler body is added (L1 §5; `interface.md` §5).

## 4. What the status line composes

- **One `content` write into `#security-status`, one string** — no new node, no second line (`src/renderer/secure-panels.ts:520-540`).
- **The composition, in order:** `token: ••••|(none)`, then `enabled: [<the carrier's list, comma-separated>]`, then `journal: ≤N|∞`, then the exclusion segment when the carrier supplied one, then the refusal token when the carrier supplied one (`:520-540`).
- **`data` appears in that `enabled:` composition by being in the carrier's list** — the pane composes it, it does not add it, which is why P-4 reads the line rather than the row alone (P-4; D-17).
- **The order inside the brackets is the record's own,** appended as grants arrive and never re-sorted into `VALID_GROUPS` order (`src/main/operator-settings/index.ts:176-181`); P-2 compares the composition as a **set**, so no row pins that order (P-2).

## 5. What `tools/list` gains and loses

- **Gains exactly the five `provident.data.*` names** on a grant and **loses exactly them** on a revoke, each read as a set difference against the same boot's earlier answer (P-4, P-6; D-11, D-26).
- **Absent, not present-and-refusing:** a disabled group's tools are never registered, so the roster answers their absence — the reading `central-data`'s interface states for the same group (`src/main/security.ts:86-88`; `docs/L2/central-data/interface.md` §4; D-11).
- **The rest of the list is unmoved by the gesture:** P-4 and P-6 also assert nothing was lost when granting and nothing gained when revoking, so a name moving in the other direction is a red row rather than a surprise (P-4, P-6).

## 6. What a restart paints

- **The instance owns the grant and the pane is its view** (D-17): a second boot on the **same** scratch profile, before any gesture, serves a `read()` whose `enabled` carries `data`, so the first carrier answer paints the row on and the status line names the group (P-5; `persistence.md` §3).
- **The paint is not a cache:** nothing in the renderer persists the set — the six rows are re-authored at boot and re-filled from the instance's record, so a boot with no record paints all six off and a boot with a record paints what the record carries (`src/renderer/secure-panels.ts:333,486-510`; D-19, P-5).
- **The restart is a second process on one directory:** the leg keeps boot A's profile and boots B on it, so the claim is the file's, not a warm renderer's (L1 §4.2, P-5).
- **`tools/list` at boot B carries the five names before any gesture,** which is the same fact read over the other channel (P-5; D-11).

## 7. What this document does not claim

- **No pointer-level gesture:** a body-issued `click` carries an event name and a rendered element, never a coordinate, so P-3's non-zero rendered box is a row rather than a comfort (`docs/L1/secure-panels.md` §4.2; `scripts/electron-ui.mjs:238-241`; D-30).
- **No packaged-app claim, and no claim about the pane under another display or DPI** — the leg states its own limit and this document inherits it (`docs/L1/secure-panels.md` §4.2; D-37).
- **No claim that the pane is the only control over the grant:** `security.set` is reachable by any renderer code in the operator's realm and by no MCP path; the pane's isolation is about MCP reach, not about the channel's exclusivity (`src/main/main.ts:337-338`; D-18).
- **No claim that the exclusion pair gates the sixth row's write — measurement says it does not.** Replaced, not softened: this document said a `set` while the tier is closed "answers a **refusal value** and moves no byte". **Measured at this head, with the pair at `mcp-disabled`: `read()` answers the closed token `{status:'refused', reason:'tier4-closed'}`, and `surface.set({groups:['data']})` in that same state COMMITS and rewrites the bytes** — `{"operator-settings":{"enabled":["data"]}}`, receipt `committed`. The surface declares it in its own words: `tier4-closed` is a **read outcome and never a write outcome** (`src/main/settings-surface/index.ts:28`); the token is minted only in `read()` (`:123-137`), and the module imports the tier holder's **writer** and never its reader (`:17,107,219`), so its `set` (`:139-190`) consults no tier state at all.
- **For a consumer, plainly: a closed tier stops a reader, not a writer.** A click from a closed state is a write like any other — the record moves, the receipt is `committed`, and the row repaints from the carrier's answer, so the status line can read `· refused: tier4-closed` beside a row that click just changed. Nothing on this path withholds the write: the holder's one total reader has no `src/**` consumer at this head (D-22's second half parks that enforcement), so the closed pair's only effect here is the token in the read answer. **No demand against the package follows** — D-5/D-16 govern that, and this is the tree's own composition (D-16 retired `tier4-closed` as a *write* outcome; the token survives as the channel's read reading). Unasserted by `P-1`…`P-7` **and by the battery**: no row of either drives the closed pair (`interface.md` §7).
- **One stale declaration is named here rather than edited:** the comment block at `src/main/preload.ts:55-62` still says a `set` attempted while the pair is closed "answers the channel refusal `{status:'refused', reason:'tier4-closed'}` as a value" (`:60-62`) — the reading the measurement above replaces. `src/` is not this seat's write; it is routed with an owner (`interface.md` §8 `R-7`).
- **No claim about a group the pane has no row for:** under the arrangement the roster **is** the table's own key projection — there is no second list beside it — so that state is unrepresentable rather than unhandled. The declaration's exact shape is `docs/L3/secure-panels/signatures.md` §1-§2.2 and is not paraphrased here (`interface.md` §1-§2; S-1).

## 8. Assumptions, each with the alternative it rejected (`brief.md` §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-6 | the row's rendered state is read **after the first carrier answer**, and the pre-answer authored paint is stated but not asserted (§2) | asserting the authored paint as behaviour, which would make a row about the pane's own default rather than about the carrier (the `D-vi` failure shape, `src/renderer/secure-panels.ts:322-332`) |
| ASM-L2-7 | `tools/list` is read as a **set difference** within one boot (§1, §5) | a count, which D-26 forbids outside `brief.md` §6 and which no row of this unit needs |
| ASM-L2-8 | the restart claim is a **second process on one profile** (§6) | a warm re-read in the same renderer, which proves a refresh and never a restart (D-19, P-5) |
| ASM-L2-9 | §7's tier-4 reading is **this seat's measurement**, carrying its own date and the surface's declaration, and named as asserted by nobody (§7) | asserting it as coverage: no row of `P-1`…`P-7` and no battery row drives the closed pair, so a claim dressed as a row would read as a check that does not exist (D-30) |
