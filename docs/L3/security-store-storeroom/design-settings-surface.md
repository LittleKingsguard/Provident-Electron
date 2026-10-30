# L3 — `src/main/settings-surface/`: the surface

- **Layer:** L3 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 3 · **Artifact:** `security-store-storeroom-l3-design`
- **Status:** DESIGN — structure, private helpers, pseudocode and guardrail notes for one owner; the declared surface is `signatures.md` §3, the contract is `docs/L2/security-store-storeroom/interface.md` §5/§5.1 and `behaviour.md` §9/§10. §2-§6 design the **four bridge verbs**; the app-state pair `state()`/`commit()` is E-3's and is designed in `docs/L3/settings-carrier-retirement/design.md` §3, cited here and never restated (D-43; rev 3)
- **Charter:** D-17 the surface is a separate module, seeing the instance through read, write and listeners alone · D-18 one operator-only reference, tested by absence · D-14 its `N` counts both sides
- **Ceiling:** 150 lines, class max (D-1) · `guide §n` is `node_modules/provident-storeroom/README.guide.md`, read and never edited (D-5)

## 1. The shape

| what | the decision | cite |
|---|---|---|
| files | **one**: `src/main/settings-surface/index.ts` — the factory, the **six** verbs (the four bridge verbs designed below and E-3's app-state pair), and the receipt types E-2 moves here | interface §5; exception §2 E-2 |
| the instance | constructed **here**, once, and held here — the operator path's single reference | interface §5; D-18; `ASM-L2-8` |
| held state | the sink, the one subscription's withdrawal and the group list this module last applied to the gate (§6) — **never a copy of the record** | interface §5; ASM-1 |
| the gate edge | `attach` and the listener body, and no third site: no call re-patches, polls or re-reads at boot order | interface §5; D-17; L1 §4 |
| channels | none registered here: `main.ts` keeps the three `ipcMain.handle` sites and delegates each body to a verb | exception §2 E-3; D-18 |
| rendered element | none, and no MCP drive — `provident.dispatch`, `get_rendered_html` and `get_markdown` are unmoved | D-18; L1 §4 |
| group set | **none held**: the six names are `operator-settings`' second live copy and this module never spells one | D-11, D-15; interface §5 |
| the two strings | `TIER4_CLOSED` and `TIER4_CLOSED_MESSAGE` are **imported from their landed home**, never re-spelled | the deleted `src/main/security-store.ts:10-16` carried; D-16; ASM-6 |

## 2. `read()` — the carrier, and one reading feeding both additive members

```
read():
  record ← settings.read()                                    · D-17: the instance IS the machine
  open   ← record.exclusion is 'mcp-disabled'                  · interface §1: tier4 is derived, never stored
  return { token, enabled: [...record.enabled], maxJournalLength?,
           read:   open ? TIER4_CLOSED_REFUSAL : null,
           exclusion: open ? 'mcp-disabled' : 'mcp-enabled' }
```

- **`read` is `null` iff the answer was minted while `exclusion` is `'mcp-enabled'`**, and the closed `{status:'refused', reason:'tier4-closed', message}` value otherwise: one reading of one row feeds both members, so the two cannot carry two states (interface §5; behaviour §10; the `read` verb's landed body in `src/main/settings-surface/index.ts`, cited by its site and never its offset — D-41).
- **The reading is the instance's row and not `tier4-state.ts`'s holder**, because the holder still carries its declared initial `STORE-OPEN` until `attach` flips it, and that initial maps to the unsafe pair — while the instance boots to the safe pair, which is what the pre-`attach` carrier must answer (interface §1 `ASM-L2-2`; the declared-initial paragraph of `src/main/tier4-state.ts`, named as a site and never its offset — D-41; the `settingsSurface.attach(mcp)` site in `src/main/main.ts`; behaviour §10; ASM-2).
- **`entries` is not on the carrier**: `SecuritySettings` stays byte-identical, so the answer is its three durable members plus `exclusion` and `read` and nothing else (interface §5; exception §2 E-2).
- **`tier4-closed` here is a read token and never a write outcome**, and no third state exists (D-16; interface §3).

## 3. `set()` — one composed record, one write, and the receipt on this channel

```
set(patch):
  values  ← read each declared position ONCE off the patch            · the deleted security-store.ts:341-354 carried
  current ← settings.read()                                            · the merge base is the durable row
  enabled ← current.enabled, then each `groups` name not already held appended in the caller's order,
            then each `disable` name removed                           · behaviour §10; interface §5
  receipt ← settings.write({ token?, enabled, maxJournalLength? })     · one store write, one receipt
  post    ← settings.read()                                            · guide §9.4: a refusal leaves the row as it stood
  return  { token, enabled: [...post.enabled], maxJournalLength?, write: receipt, exclusion: post.exclusion }
```

- **The group set is deduplicated and filtered through the six names by the instance**, so the second live copy stays in `operator-settings` and a non-group string is dropped there, not here (interface §5; D-11, D-15; behaviour §2).
- **The answer is minted after the store has delivered**, so `getGateConfig().enabled` already holds the granted groups when the operator reads it — the re-patch runs inside the subscription, inside the write (guide §9.2; D-17; behaviour §10).
- **`write` is never absent on a SET answer**, and a refused write answers the post-state beside its refusal, because a refusal mints nothing and moves nothing (interface §5; guide §9.4; behaviour §2, §4).
- **No tier-4 consult gates this write**: the store-side consult retired with the displaced file, and the isolation is structural rather than a refusal inside the MCP stack (D-16; D-18; behaviour §10).

## 4. `transition()` — two literals, no receipt member, no throw

```
transition(state):
  current ← settings.read().exclusion
  if state is neither 'mcp-enabled' nor 'mcp-disabled'
      → { applied: false, state: current, reason: 'malformed-state' }        · interface §5.1
  receipt ← settings.write({ exclusion: state })                             · one mem write
  if receipt.status is 'refused' → { applied: false, state: settings.read().exclusion }   · interface §5.1
  return { applied: true, state: settings.read().exclusion }
```

- **The answer carries no receipt member**: the bridge's `setExclusion` resolution is `{applied, state, reason?}` and `write` is declared on `set` alone, so E-2's licence does not reach this answer (interface §5.1 `ASM-L2-4`; `src/main/preload.ts:63-64`).
- **`reason:'malformed-state'` is the input arm alone and is total over every outside value** — a boolean, a number, an object, an array, `undefined`, `null`, an unknown string, a case variant, a padded string (behaviour §10; `transition`'s malformed-state arm in `src/main/settings-surface/index.ts`; D-41).
- **`{applied:false, state}` with no `reason` is the store's arm**, and the only state that produces it is *no instance stands*: a well-formed two-literal `mem` write at a standing instance cannot refuse (interface §5.1; guide §8.2).
- **The receipt of a transition is observed on `set` and on the record**, never on this answer, and the state it left is read back through `read().exclusion` (interface §5.1; behaviour §10).

## 5. `attach()` — the composition's second act, and the only gate edge

```
attach(sink):
  sink held; if a subscription already stands, none is made a second time     · D-17; ASM-3
  off   ← settings.subscribe(onDelivery)                    · subscribe FIRST: no change can fall between the acts
  record ← settings.read()
  setTier4OpenState(record.exclusion is 'mcp-disabled')      · exception §2 E-3: this module is the holder's sole writer
  sink.applyGatePatch(patchOf(record))                       · §5, ASM-7: `token` crosses only while a string stands
  appliedGroups ← [...record.enabled]                        · what the gate now holds, §6
  sink.applyExclusion(record.exclusion)                      · the boot terminal 'mcp-enabled'; a self-transition is lawful
```

- **`attach` is where the boot terminal lands**: before it the gate is untouched, after it the gate's groups equal the record's and its exclusion is the pair the instance booted to. **The boot's order is L1's to state and is cited, not restated** — the `C-3` row of `docs/L1/security-store-storeroom.md` §7 (D-43). Measured at this head the window is created and its renderer loaded **before** `await mcp.start()` (the `new BrowserWindow(` / `win.loadFile(` pair ahead of `mcp.start()` in `src/main/main.ts`), and `attach`'s flip precedes both (interface §5; L1 §7 `C-3`; behaviour §10).
- **`patchOf(record)` is the one composer of the sink's patch, and it carries `token` only while a non-empty string stands** (ASM-7): the gate admits that member as a non-empty string wherever it is **present** and rejects the **whole patch** — groups included — for any other value, so a `token:null` would leave `attach`'s boot patch and every later group patch silently unapplied on exactly the first-run profile, whose default token is `null` (`src/main/security.ts:176-179`, `:94-96`; interface §2; behaviour §1; exception §2 E-2, E-3, §6).
- **The outcome is the gate's groups equal the record's after `attach` and after each committed write**, and the one thing this sink cannot carry is a **cleared** token: the declared patch has no member that expresses a clear and E-2/E-3 licence none, so the gate keeps the token it stood with while its groups still land (interface §5; behaviour §10; exception §2 E-2, E-3, §6; ASM-7).
- **Subscribe before the first patch**, so a commit landing between the two acts is delivered rather than lost (D-17; guide §6.1).
- **One subscription per surface**: a second `attach` replaces the sink and registers no second listener, so the instance keeps the one subscription D-17 declares (D-17; interface §5; ASM-3).
- **`src/main/tier4-state.ts`'s holder is written here and on every delivery**, from the same reading that answers the carrier, so it is the gate's projection of the instance's row and no second home — the one cross-module write this unit licences, on a path that stays `operator-settings`' and is never claimed twice (exception §2 E-3; L1 §3 `ASM-4`; `modules.md` §3; ASM-4). **Nothing inside `src/` reads it**: `tier4OpenState` is called by no file there, and the enforcement truth is the gate's own record — its `exclusionState()`, read by `mcp-server.ts`'s `exclusionTurn(...)` and again at the HTTP POST arm — so the holder is a projection that cannot drift a decision, never a value the gate consults (the header of `src/main/tier4-state.ts`).

## 6. The listener — the re-patch, and never a poll

```
onDelivery(address):
  record ← settings.read()                                        · guide §6.4: the one argument is the address
  setTier4OpenState(record.exclusion is 'mcp-disabled')           · E-3, from the same reading
  if no sink stands → return
  if the address names EXCLUSION_ADDRESS → sink.applyExclusion(record.exclusion); return   · the transition's own path
  removed ← appliedGroups minus record.enabled                     · the gate's apply ADDS groups and removes `disable`
  sink.applyGatePatch({ ...patchOf(record), disable: removed })   · §5, ASM-7: the token never blocks the removal set
  appliedGroups ← [...record.enabled]
```

- **The subscription is the change path**: a committed write reaches the gate from inside the listener, never from a call site, a poll or a boot-order re-read (D-17; L1 §4; behaviour §10).
- **The delivery carries the address and nothing else**, so the listener reads the record — exactly the shape the package's notification form requires of a whole-record writer (guide §6.4; exception §8 item 2; ASM-1).
- **The removal set is this module's own record of what it last applied**, because the gate's `applyPatch` adds `groups` and removes only what `disable` names and the sink declares no `enabled` reader: passing the record's set alone would leave a revoked group enabled (interface §5; `src/main/security.ts:167-200`; ASM-5).
- **An unknown address applies both arms**, so the body is total over the domain the package may deliver (guide §6.3; interface §5).
- **A self-transition is a lawful no-op**, so re-applying an unchanged exclusion bumps no epoch and abandons no work (guide §6.5; `src/main/mcp-server.ts:476-491`).
- **The body is contained by the instance's own listener wrapper and a throwing body is withdrawn**, so the write that triggered it still answers its receipt (guide §6.5a; `ASM-L2-6`).

## 7. Guardrails for L4

- **The declared surface is six verbs and no more** — `read`, `set`, `transition`, `attach` designed here, plus E-3's `state`/`commit` — beside the factory and the types; no seventh member and no second export path (interface §5; `interface.md` §7 `A-4`; `docs/L3/settings-carrier-retirement/design.md` §3).
- **No rendered element and no MCP drive**: `window.provident` gains no member, its seven top-level members stand, and the three security routes keep their declared answers (D-18; L1 §6 ISO-4; interface §5).
- **No second instance, no second `filePath`, no second `userDataDir`-derived name**: one instance per surface, for the process's life (persistence §8; D-16; D-18).
- **No `node:fs`, no `electron`, no `ipcMain`, no `provident-storeroom` import**: the instance is the only seam, and the three channel bodies are delegated to, never registered here (interface §5; exception §2 E-3; D-18).
- **Nothing names a `ToolGroup`**: the sink is structural, so `ProvidentMcpServer` satisfies it as it stands and this module adds no group spelling (interface §5; D-15).
- **The sink is called through `patchOf` and never with an inline patch**, and `SettingsGateSink` is never widened with a member that clears the token or reads the gate's: the declared three members are the whole seam (interface §5; exception §2 E-2, E-3, §6; ASM-7).

## 8. Assumptions made here that L2 left open, with the alternative each rejected

| id | assumption | the rejected alternative |
|---|---|---|
| ASM-1 | the surface holds the sink, the one withdrawal and the last applied group list — **never a copy of the record** | caching the record to save a store read, which a refusal or a hand-edited file would leave answering a state the bytes do not carry (guide §9.4) |
| ASM-2 | the carrier's two additive members derive from the **instance's row**, not from `tier4-state.ts`'s holder | feeding both members from `tier4OpenState()`, the landed body's shape, which answers the unsafe pair before `attach` flips it (behaviour §10 row 1; the declared-initial paragraph of `src/main/tier4-state.ts`) |
| ASM-3 | `attach` subscribes **then** patches, and a second `attach` replaces the sink without a second subscription | patch-then-subscribe, which drops a commit landing between the two acts (D-17; guide §6.1) |
| ASM-4 | the surface **writes** the holder on the committed `mem` write and at `attach`, and reads it nowhere — nor does any other file under `src/`, so its only reader at this head is the unit's own live row outside `src/`, and the gate's enforcement reads `exclusionState()`, never this holder | deleting the write, which would leave `src/main/tier4-state.ts` with no producer at all after E-1 retires the store's two consult sites (exception §2 E-3; L1 §3 `ASM-4`; the header of `src/main/tier4-state.ts`) |
| ASM-5 | the re-patch's `disable` set is the surface's own last-applied list | re-deriving the six names here to pass "everything not granted", which re-creates the second live copy C-1 exists to consolidate (D-15; `src/main/security.ts:182-188`) |
| ASM-6 | `TIER4_CLOSED`/`TIER4_CLOSED_MESSAGE` are imported from `mcp-server.js` and `ExclusionState` re-exported from `security.js` | minting the sentence or the two tokens here, which gives one refusal — and one closed pair — two spellings (PAR-13; the deleted `src/main/security-store.ts:10-16`) |
| ASM-7 | `patchOf` **omits** `token` while the record's token is `null`, so the group patch always reaches the gate and a cleared token is not propagated | passing `token: record.token` unconditionally, which the gate rejects **whole** and answers with the configuration unchanged, dropping the boot patch and every later group patch on the first-run profile (`src/main/security.ts:176-179`); or adding a clear member to `SettingsGateSink`, which E-2/E-3 licence and the exception's §6 does not (interface §5; exception §2 E-2, E-3, §6) |
