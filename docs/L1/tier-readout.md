# L1 — `tier-readout`: `data.read` answers each node's own tier, composed over `readTiered`

- **Layer:** L1 · **Unit:** `tier-readout` · **Branch:** `strata` (D-6) · **Rev:** 1 — rev 1 carries row `6` of
  `strata/next-steps.md` on the adoption `D-133`/`D-134` already landed, and states the reachability split against row `5` (§5)
- **Charter:** the user's finding, verbatim — *"The returned object should already include the tier data. If it doesn't that
  is a defect."* — answered by `1.10.0`'s `readTiered`: ONE `_tier` at EVERY node the read returns (D-133, D-134)
- **Status:** DESIGN — the unit is admitted at L1 and `src/**` is read-only in this pass. Every row of §4 is RED until L4
  lands, and each red is the absence its row NAMES, never an authoring error (§4, D-40)
- **Ceiling:** 150 lines (class max), split by owner, never appended (D-1, D-2)
- **Write scope:** `docs/L1/`, `tests/e2e/`, `strata/modules.json`, `strata/marks.json` (brief §3, D-30).
  `provident-storeroom` is READ AND NEVER MODIFIED (D-5)
- **Inputs:** `strata/brief.md` §1/§3/§6, `strata/next-steps.md` rows `5`/`6`, `D-133`, `D-134`, `D-101`, `D-103`, `D-107`,
  `D-41`, `D-26`, `D-43`, `D-30`, `D-40`, the package's own `index.d.ts` (`TieredNode`, `readTiered`), the tree at this head

## 1. What this unit is

- `data.read`'s passing answer stops carrying a bare value and carries the release's own `TieredNode`: an OBJECT node is
  `{_tier, …members}` with its members INLINE and no `value` wrapper, an ARRAY node is `{_tier, value: […]}` and a LEAF node
  is `{_tier, value: <literal>}` — so every node of the answer is an OBJECT, never a primitive and never a bare array (D-134).
- `_tier` is THAT node's own tier — one of `mem`/`file`/`temp` and NEVER a set, because `TierSet` is the ARGUMENT's type and
  the answer never carries one; an object's or an array's is its own anchor tier and a leaf's is the tier of the version the
  read selected (D-134, `index.d.ts`'s `TieredNode` and `readTiered` docblock).
- **A per-node readout is the only true shape, and that is why the per-call echo is not the design**: one call can return
  nodes standing at DIFFERENT tiers, which an echo of the caller's argument cannot say — and `D-133`'s echo shape was
  superseded BY POINTER, before it was built, by the release the user pointed at (D-133, D-134, D-46).
- **The notes' own lossy name, cited rather than rediscovered**: a caller's stored `_tier` is SHADOWED by the minted field at
  every node, and the default `read` at the same address still answers it; nothing under `src/` stores a `_tier` today, so the
  name costs this tree nothing and a future writer would shadow itself (D-134; §4 `T-7` measures both halves).
- The read's TIER ARGUMENT is unmoved: an omitted `tier` is the store's unqualified walk and a named token narrows the read —
  the readout names what the store ANSWERED and never what the caller ASKED, which is the one reading `D-134` fixes (D-101).
- `read` and `readLiteral` are unchanged byte for byte, so `list`'s walk and `delete`'s standing probe stay on them; the
  composition moves the READ verb alone (D-134, D-101).
- **The seam gains no byte, and that is a measurement rather than an omission**: the verb is typed at the declaration
  (`readTiered(address, tier?): TieredNode`) and `ProfileStore` is `ReturnType<typeof createProfileStore>`, so the package's
  own type already reaches `src/main/data/` without any file there spelling the package — and `S-9`'s census, `15` members
  over `13` symbols with the verb third, is the reading that proves it (D-134, D-103, §9 `ASM-2`).

## 2. The map rows this unit's design lands on

A row's own `paths` and `endpoints` are the MAP's and are never restated here except where this unit moved one — a copy of them
is a summary that cannot be kept true (D-43, D-26). The paths below are the ones this design REACHES, cited to the site (D-41).

| Row | What this unit's design lands on it | The row's paths this design reaches |
|---|---|---|
| `central-data` | **THE OWNER row `6` names.** The answer shape (§3); **`tests/e2e/tier-readout/` is FILED on this row** (§4, D-10); and the map's `endpoints` moves `15 → 16` for the ONE call `E-2` adds: when the composition lands, `readTiered` JOINS the called package exports, and `read` and `readLiteral` keep their own call sites (`list`'s walk, `delete`'s standing probe, `src/main/data/surface.ts`) — so the figure rises by one and falls by none under `D-14`'s `N` convention. At this head `grep -rn "readTiered" src/` answers the seam's census line and no caller, which is the composition this unit is (D-14, D-101, D-41) | `src/main/data/types.ts`, `src/main/data/surface.ts`, `src/main/data/index.ts`, `tests/e2e/tier-readout/` (filed by this unit), `tests/e2e/central-data/`, `tests/integration/central-data/{bridge-route,value-arms,declared-root,message-log}.test.ts` — and **`src/main/storeroom.ts` is claimed and gains NO byte** (§1, D-134) |
| `mcp-surface` | the tool's NAME, its two-member argument schema and its registration are UNMOVED; **its DESCRIPTION** stops promising a bare value — one sentence, that row's L4's edit and named here, not taken (D-18) | `src/main/mcp-server.ts` |
| `renderer-wiring` | no `src/renderer/` byte: the `data.read` arm is a pass-through, so what moves is its battery's record READER, which unwraps the answer's `value` | `tests/e2e/focus-retirement/` |
| `store-tabs-record` | no `src/main/tabs-record/` byte: the leg's `recordView` reader and `X-31`'s `row` arm read `data.read`'s answer | `tests/e2e/store-crossings/` |

`app-shell` is named and NOT claimed: the five `ipcMain.handle` sites and the preload's five members carry the answer as a
value and move no member, so this unit adds no route and no bridge surface (D-112, D-18). `central-data`'s `S-9` row stays
GREEN: it pins the seam's census, which `D-134` already re-grained (D-134).

## 3. The module-interaction table

| Question | The answer this unit fixes | Cite |
|---|---|---|
| Who asks? | an agent's `provident.data.read` over either transport, and the renderer's own `window.provident.data.read` — the five arms and five `ipcMain.handle` sites `D-112` landed | D-112, D-18 |
| Who answers? | `createDataSurface().read` in main, over the boot's ONE instance: `store.readTiered(address, tier?)`, ONE call per read — the `readLiteral`-then-`read` pair the two passing arms compose today is what the composition replaces | D-134, D-80 |
| At which tier? | the caller's `tier` when one is named, and the store's unqualified walk across every tier when none is — which is exactly why the readout is per node and not per call | D-101, D-134 |
| Which arms gain a readout? | both PASSING arms — `kind:'row'` and `kind:'branch'` — and every node inside them, at every depth | D-134 |
| Which arms gain NOTHING? | `absent` and every `DataLedger` arm: an absence states a fact about the caller's own argument, and a refusal that never reached a store has no node to name — the same reading that keeps `log` off those arms | D-133, D-107 |
| What does the tool's answer shape become? | `{status:'read', kind, path, value}` with `value` the `TieredNode`; the answer's own member set is UNMOVED, so a fourth arm member carrying a tier would be the superseded echo wearing a name | D-134, D-53 |
| Is `kind` still answered? | yes, and it and the readout describe ONE node; which node kind yields which `kind` is L2's and L3's to state, not this layer's | D-134 |
| What do the other four verbs answer? | what they answer today — paths, a cursor, `removed`/`tiers`, `repaired`/`log`, a retained window — because the readout is the read verb's and a receipt names no node | D-103, D-107 |

## 4. The `§5.T`-style e2e matrix — `tests/e2e/tier-readout/`

Every row is an **agent-or-drive exchange at a process boundary**: an MCP call over the built bundle's stdio, a drive of the
app's own `window.provident.data` member inside its renderer realm, the app's own profile file read by this process, or a
second boot on the same profile. No row imports `src/**` — the internals it would name are the ones this design moves — and no
row is skipped, conditionally disabled or softened (D-30, D-40, D-27). **Every row is RED at this head and red for the absence
it names**: today's answer is `{status, kind, path, value}` with a bare value and no `_tier` anywhere (D-133, D-134).

| Id | What it drives | What it measures | The boundary it stands on | Its declared failure mode |
|---|---|---|---|---|
| `T-1` | one scratch profile, one boot: seed `['tier-shape']` at `file` with a value carrying a scalar, a boolean, a number, a dense array and a nested object, then `provident.data.read` at the object address and at one leaf address | **the readout is a TOTAL FUNCTION OF NODE KIND**: the object address answers `kind:'branch'` with `{_tier:'file', …members}` inline and no `value` wrapper, its array member is `{_tier, value:[…]}` with each element its own node, and the leaf address answers `kind:'row'` with `{_tier:'file', value:<the literal>}` — asserted by EQUALITY, so a fifth node form or a bare value reds | an agent's `data.write` and `data.read` over stdio | the value stands plain (today's shape), or the wrapper is applied to an object node, or a leaf's literal is wrapped twice, or `kind` disagrees with the node |
| `T-2` | one boot: seed `['tier-file']` at `file` and `['tier-mem']` at `mem`, then ONE `provident.data.read({path:[]})` with no tier | **ONE CALL RETURNS NODES AT DIFFERENT TIERS, EACH NAMED BY ITSELF**: the register node's `tier-file` member answers `_tier:'file'` and its `tier-mem` member `_tier:'mem'`, in the same answer — and the register node itself carries one `_tier` in the three-token domain, asserted as a member of the set and not pinned to a token | an agent's two writes and one read over stdio | one tier repeated across the answer, a set or an array at `_tier`, or no `_tier` at the register node |
| `T-3` | one boot: a seeding `provident.data.write` at `['tier-file']`, then `provident.data.read` at that address naming `tier:'file'`, then at the SAME address naming `tier:'mem'`, then at a volatile spelling | **THE READOUT IS IN THE NODE AND THE ARMS THAT GAIN NOTHING GAIN NOTHING**: the narrowed read's node answers `_tier:'file'` and its answer's key set is exactly `['kind','path','status','value']`; the read at `mem` answers `status:'absent'` with keys exactly `['path','status']` — no `_tier` and no `tier`; the volatile refusal is a ledger carrying neither | one seeding write and three reads — four agent acts over stdio | a `tier` member on either the passing or the absent arm (the superseded echo), or an absence answering a node, or a narrowed read naming the wrong tier |
| `T-4` | one boot: seed `['tier-temp']` at `temp`, read it, then seed the SAME address at `mem` and read it again — **the tier row `5`'s drag will write, reached through the agent's own route** (§5) | **`temp` IS READABLE AND ITS READOUT FOLLOWS THE WINNING VERSION**: the first read answers `_tier:'temp'`, the second `_tier:'mem'` carrying the later value, so a `mem` write shadows a `temp` one and the readout says which won | two writes and two reads — four agent acts over stdio | `temp` refused or unreachable through the agent's route, the readout naming the first tier after the shadowing write, or the value and the tier disagreeing |
| `T-5` | one scratch profile, TWO boots: seed `['tier-file']` / `['tier-mem']` / `['tier-temp']`, read all three, stop, and this process reads the profile file's bytes; then boot again on the same profile and read all three | **THE READOUT IS TRUE ABOUT DURABILITY**: boot two answers `_tier:'file'` with the value intact and `absent` at the two volatile addresses; the file carries the `file` key and neither volatile one; and **no `_tier` appears in the file's bytes** — the readout is the read's compilation and does not round-trip | the app's own profile file, read between the boots, and a second process on the same profile | boot two answering `mem` or `temp` for a volatile address (the readout lying about durability), the file carrying a volatile key, or a minted `_tier` written back into the bytes |
| `T-6` | one boot with the driver envelope loaded: a handler body calls `window.provident.data.read({path:['tier-file']})` in the renderer realm and frames the answer, read back through `provident.get_rendered_html` | **THE READOUT CROSSES THE APP'S OWN ROUTE AND MINTS NO MEMBER**: the framed answer's node answers `_tier:'file'`, and `window.provident.data`'s own member set is the five `D-112` landed — no sixth member for the tier | the preload's own member driven inside its renderer realm, read back through MCP | the route answering a plain value (the composition main-only and unwrapped at the route), or a sixth `data` member appearing so the renderer can ask |
| `T-7` | one boot: seed `['tier-lossy']` at `file` with `{_tier:'not-a-tier', label:'kept'}`, read it, then read the profile file's bytes | **THE LOSSY NAME, BOTH HALVES** (§1): the answer's node reads `_tier:'file'` — the minted field WINS over the stored one — its other member `label` is delivered untouched, and the file still carries `not-a-tier`, so nothing was destroyed and the shadowing is the only loss | an agent's write and read over stdio, and the profile file this process reads | the answer carrying `not-a-tier` (the minted field losing), the write refused, the sibling member missing, or the stored value absent from the bytes |
| `T-8` | one boot, no write by the row: `provident.data.read` at `['tabs']` and at `['zones']` — the two families the boot's own declarations mint | **THE APP'S OWN FAMILIES ANSWER THE TIERS THEY ARE DECLARED AT**: `['tabs']` answers `_tier:'file'` and `['zones']` `_tier:'mem'` in the same process, so the readout is not one tier repeated and a caller needs no second read to learn a family's tier | two agent reads over stdio against the boot's own store | both families reading one tier, a family's `_tier` disagreeing with the tier its declaration writes at, or a readout absent where a family stands |

## 5. The reachability split against row `5`

Row `6`'s `Closed when` ends with a clause whose artefact is ROW `5`'s, so the split is stated rather than assumed (D-132, D-133):

- **REACHABLE AT THIS UNIT'S CLOSE — the readout the ghost WILL ASK.** `data.read`'s answer names each node's own tier, so
  *"is this pane's reading at `temp`?"* is answered by the DELIVERY and no client member is invented for one consumer — the
  question `D-133` puts there. §4 `T-4` drives that exact question through the agent's own route: a `temp` write at an
  undeclared root answers `_tier:'temp'`, and a `mem` write at the same address moves the readout to `mem` (D-101, D-133).
- **WAITS ON ROW `5` — the GHOST ITSELF.** No `temp` tier is written anywhere under `src/` today, so no app family stands at
  `temp`, the pane renderer asks nothing, and the `temp` address, its tier constant, its `viewDeclaredRoots` entry, its route,
  its client method and its joining the record's subscription array are row `5`'s to land (D-132, D-137, D-101).
- **So neither row claims the other's work**: row `6` supplies the ANSWER and row `5` the ASKER, and `T-4` measures the answer
  at the tier row `5` will use without pretending the asker exists (D-133, D-132, D-30).

## 6. Closed when — verbatim from `strata/next-steps.md` row `6`

> the tree runs `1.10.0`, `data.read` answers each node's `_tier`, the four node legs and five Electron legs are re-taken over
> the bump, and the pane renderer's ghost asks the DELIVERY for the tier instead of the client inventing a member

The first clause is `D-134`'s landed half; the second is §4's rows `T-1`…`T-3` and `T-5`…`T-8`; the third is §7's `E-1`…`E-4`
landing green on all four node legs with the reached Electron leg re-taken beside them; and the fourth splits as §5 states, its
answer half here and its asker half on row `5` (D-134, D-133).

## 7. The licensed edit list, by path — one writer each (D-3, D-4)

`E-1`…`E-4` land TOGETHER: an answer shape and the type that names it are one edit, and a half published alone is a signature
no file satisfies (D-53). `E-5`…`E-8` land **IN THE SAME EDIT AS `E-1`/`E-2`** and never ahead of them — a row re-grained
against a shape the tree has not reached reds a green battery for a state that is not the tree's (`D-137`'s same-edit
precondition, whose original subject is the row-`5` `temp` root).

| Id | Path (owning row) | The writes this design names | Landed by |
|---|---|---|---|
| `E-1` | `src/main/data/types.ts` (`central-data`) | `DataReadAnswer`'s two passing arms: `value` becomes the seam's `TieredNode`, and the `absent` and `DataLedger` arms keep their member sets (§3) | its L4, one shot |
| `E-2` | `src/main/data/surface.ts` (`central-data`) | `read`'s ONE call to the tiered verb through the boot's instance, and its `kind` derived from the node it received; `list`'s walk and `delete`'s probe unmoved (D-101) | its L4, one shot |
| `E-3` | `src/main/data/index.ts` (`central-data`) | the export of the node type the answer now names — a TYPE re-export, so no value joins the module's one entry and no second spelling of the shape appears (D-53) | its L4, one shot |
| `E-4` | `src/main/mcp-server.ts` (`mcp-surface`) | the `provident.data.read` description's answer sentence; no member, no tool, no group, no count (D-18) | that row's L4, one shot |
| `E-5` | `tests/e2e/central-data/scenarios.test.ts` (`central-data`) | `S-3`, `S-4`, `S-5`, `S-6`, `S-12`'s read literals re-grained to the tiered value; `S-9`'s census row unmoved (D-134) | this unit's L1 battery pass, with `E-1`/`E-2` |
| `E-6` | `tests/integration/central-data/{bridge-route,value-arms,declared-root,message-log}.test.ts` (`central-data`) | the same re-grain across the integration battery — gating and unmarked, so a stale literal reds a leg (D-40) | its L2 test pass, with `E-1`/`E-2` |
| `E-7` | `tests/e2e/focus-retirement/focus-retirement.test.ts` (`renderer-wiring`) | `readAddress`/`recordOf` unwrap the node before the record readers run; no row's claim moves | L1's battery pass, with `E-1`/`E-2` |
| `E-8` | `tests/e2e/store-crossings/crossings-live.mjs` (`store-tabs-record`) | `recordView` and `X-31`'s `row` arm read the node; the leg's row COUNT is unmoved (D-94) | L1's battery pass, with `E-1`/`E-2` |

## 8. What this unit does not do

- **No new MCP tool, resource, group or bridge member**, and no `src/renderer/` byte: the renderer's `data.read` arm already
  passes the answer through, so a sixth `data` member would be a surface this answer never needed (D-18, D-112).
- **The ghost is not this unit's**: §5 assigns the asker to row `5` and this unit supplies only the answer it will ask for
  (D-132, D-133).
- **No package change**, at any layer: `provident-storeroom` is read and never modified, and the verb was adopted from the
  registry at `D-134` (D-5).
- **The reached batteries are NOT re-grained in this pass**: `E-5`…`E-8` land with the shape, because a re-grain ahead of it is
  a battery measuring a state the tree has not reached (D-137, D-30).
- **`docs/L1/central-data-management.md` §5's `S-9` row still reads "(14 members / 11 symbols)"** and is that LANDED document's
  dated row; the live figure is the seam's own census and `D-134`, re-measured at `tests/e2e/central-data/`'s `S-9`. Named here
  and not edited, because a landed unit's document is re-grained by the pass that owns its number (D-43, D-26, D-3).

## 9. Assumptions, each with the alternative it rejected (D-1 §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | the answer's `value` CARRIES the release's `TieredNode` form unchanged, so a leaf answers `{_tier, value}` under the answer's own `value` | flattening the node into the arm as `{status, kind, path, _tier, value}`, which collides with the answer's own members for an object node and gives this surface a SECOND spelling of a shape the package already declares (D-53, D-134) |
| ASM-2 | the seam gains no byte: the typed verb reaches `src/main/data/` through `ProfileStore` and `S-9`'s census is the pin | a declared seam accessor mirroring `commitLog`, which existed because that member was UNTYPED — a typed member removes an assertion and not a function (D-103, D-134) |
| ASM-3 | the `absent` and `DataLedger` arms gain NOTHING | carrying the caller's tier on them as `D-133` first proposed, which states the ARGUMENT rather than the answer and makes every refusal claim something about a store it never reached (D-107, D-134) |
| ASM-4 | only `T-6`'s boot waits for the renderer realm, because the other seven read what main answers over stdio and that surface stands before the window does | a renderer wait on every boot, which binds a fact those rows do not claim and spends the bound's whole margin per row (D-27, D-94) |
