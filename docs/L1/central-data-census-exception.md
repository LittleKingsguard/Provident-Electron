# L1 — `central-data`'s census re-grain: one declared cross-module exception

- **Layer:** L1 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 2 — rev 1 is read through
  this one: N measured 16 → 15 (§1), E-3 added (§2), E-4 added and the two falsified comment figures licensed (§3)
- **Status:** DECLARED — filed before this unit's L2 work opened, so no writer below this layer improvises it; rev 2
  filed at the closing examination, after the move it licenses was measured
- **Inputs:** `docs/L1/central-data-management.md` rev 2 §3/§4/§8, `strata/decisions.md` D-5/D-10/D-11/D-12/D-13/D-14/D-15,
  `strata/modules.json`, `strata/modules.md` §1/§3/§5, `strata/platform.md` §4, the L2 examiner's readings at `57c5825`
  and at `d52cd13`
- **Ceiling:** 150 lines (class max) (D-1)

## 1. What this artifact decides

D-11 puts the tool census in the same unit that registers the tools, and D-15 fixes where that move happens: the live
tree only, never the archived corpus. The five `provident.data.*` tools are registered from `src/main/mcp-server.ts`
and gated from `src/main/security.ts`, and both files are claimed by the `mcp-surface` row of the map — not by
`central-data` (`strata/modules.json:3-32,64-73`; D-11, D-15). This unit therefore cannot execute D-11 without
touching another module's paths, and `modules.md` §1 forbids a module agent doing that silently.

**Decision.** One **declared cross-module exception**, enumerated by path in §2, with a named writer per row in §3
and a closed set of moved numbers in §4. It licences writes on the stated paths for this unit and no others, it does
not renew, and it moves no module's declared surface other than the census it names (D-4's precedent for a swept
pass, D-11, D-15).

**The map's one row moves, and only its count.** `central-data`'s N is **15**, not L1 rev 2 §2's 16: the sixth
`provident-storeroom` export the earlier count carried, `register`, has no call site — the package publishes no route
by which a caller restricted to `register` observes a change — so the surface consumed is 5 tools + 5 bridge routes
answered + 5 exports called (`storeCreate`, `read`, `readLiteral`, `write`, `delete`), measured by this unit's L2
examiner at `57c5825` and corrected here (`strata/modules.json:72`; D-14, `strata/platform.md` §4). L1 rev 2 §2's
figure is read through this clause. The cap follows: `50 + 10×15 = 200`. `mcp-surface` keeps `30` — 22 tools + 3
resources + the five `data` tools it registers and gates (D-11).

## 2. The exception, by path (E-1 census · E-2 rows · E-3 composition)

**E-1 — the census: four files, exactly the lines named.** The first four rows below are the census and nothing else:
no behaviour of the owning module changes, no exported name changes meaning, no reformatting, no comment sweep
(D-15, `modules.md` §5). **E-3 is not a census row** — it is one composition line, and it is listed apart so no
reader takes it for one (D-11, D-13).

| Path (owning row) | The rows that move | Writer |
|---|---|---|
| `src/main/security.ts` (`mcp-surface`) | `ToolGroup` gains `'data'`; `TOOL_GROUPS` gains the five `provident.data.*` → `'data'`; `VALID_GROUPS` five → six (D-11, D-15) | `central-data`'s L4, one shot |
| `src/main/security-store.ts` (`operator-settings`) | `VALID_GROUPS` at `:87` gains `'data'`; `:122` and `:339` read that same constant and move with it — no second edit (D-15's second live copy) | `central-data`'s L4, one shot |
| `src/main/mcp-server.ts` (`mcp-surface`) | `ALL_TOOLS` 22 → 27 with the five names; five registrations calling the module's own adapter, each inside the landed per-invocation wrapper (`exclusionTurn`, D-11) | `central-data`'s L4, one shot |
| `src/shared/types.ts` (`ipc-contract`) | `RpcMethod` 22 → 27 with `data.read`/`data.write`/`data.delete`/`data.list`/`data.journal`; `MUTATING_METHODS` untouched at seven (D-11; L1 rev 2 §4 ASM-9) | `central-data`'s L4, one shot |

**E-3 — composition: one line, and it is not a census.** `src/main/main.ts` (`app-shell`): one import line and the one
options member on the server's options pass — `dataSurface: createDataSurface({ profileDir: app.getPath('userData') })`
— which reads `:288` at this head, the census's own two citation lines having moved it off `:284`. Without it the
five names stand in `ALL_TOOLS` and register nothing, which is D-11's own finding read backwards; the surface
constructs no store and touches no file until a tool is called, so the boot's own behaviour is unmoved (D-11, D-13;
`docs/L2/central-data/interface.md` §5). Writer: `central-data`'s L4, one shot.

**E-2 — rows, the §8 set, moved by this unit's L2 test writer.** L1 rev 2 §8 names 40 sites in 24 files — 5 `src/`
statements (they are E-1 above) and 35 test or battery rows, 2 of them compile-reds under `typecheck:tests` — and
closes the set by one predicate: *a site is in the set iff it reads one of the moved numbers* (L1 rev 2 §8). The
writer moves exactly that set and records both lists: the rows it moved, and the sites the predicate left green.

| Class | Rows | Where |
|---|---|---|
| C-1 · the tool and route census at 22 | 16 sites / 14 files | `tests/engine-pin-version.test.ts:102-132,183-210` (**compile-red**, `Record<RpcMethod, true>`), `tests/focus-tool.test.ts:74` (**compile-red**), `:526,530,623,713,721`; `tests/focus-tool-register.ts:306,1238,1240`; `tests/theme-control.test.ts:1083,1351,1357`; `census` `R-7`; `zones` `R-6`; `gesture-session` `R-6(c)`/`F-9(b)`; `gutter`; `gutter-ui` `R-11`; `slot-host` `S-5`; `layout-projection` `R-21`; `secure-exclusion` `I-EX-11` |
| C-2 · `VALID_GROUPS` at five, or "no sixth group" | 14 sites / 13 files | `focus-tool` `:428`; `focus-tool-register` `:1251`; `census`; `zones`; `gesture-session`; `gutter`; `gutter-ui`; `slot-host`; `store-core-graph` `I-11`; `secure-exclusion` `:1600,1655,5006-5007`; `secure-store-discipline` `:616-623` |
| C-3 · the persisted set at exactly two named files | 10 sites / 6 files | `store-persist` `S-3`/`SC-1`; `store-security` `F-7`/`F-10`/`I-2`/`I-3`; `store-compliance-live.mjs` `SC-B-01`/`SC-B-03`/`SC-B-09`; `secure-exclusion-live.mjs` `U-6`; `store-tabs-record-live.mjs:93,122`; `secure-exclusion.test.ts:4990` (title only) |

**Green by predicate, swept only for a stale figure:** the default-grant subset (8 names, unmoved), the seven
`MUTATING_METHODS` rows, the no-new-surface negatives that scan an untouched mechanism module's own bytes, and the
12 comment sites carrying the old numbers — L1 rev 2 §8 names each (D-11).

## 3. Who writes what, and in what order

1. **`central-data`'s L4**, in the same one-shot as the module's own source: E-1's four files and E-3's two lines,
   the lines §2 names, and nothing else (D-1 §3, `modules.md` §5).
2. **This unit's L2 test writer**, in a separate task that runs after E-1 has landed: E-2's rows, measured by the
   §8 predicate against the tree it then sees, each row moved to the new figure and no row moved by guess (D-10:
   test-side work belongs to the owning layer's test writer, never to an implementer).
3. **No third writer.** A row the predicate leaves green is left byte-identical; a row that reddens and is not in
   §8's classes is a finding recorded in the unit's record, and the finding is diagnosed, never patched under this
   exception (D-1, `examiner.md` §4).

**E-4 — the byte-image pins, licensed by this rev-2 clause.** Four frozen-digest cells in three files read none of the
moved numbers and reddened only because E-1/E-3 moved the bytes they image: `tests/secure-exclusion.test.ts`'s
`SECURITY_STORE_PIN` and its `FS-EX-15` chain, `tests/tier4-arbitrary-storage-register.ts`'s pin chain,
`tests/secure-store-discipline.test.ts`'s two `P-O3-TP-1` digests. Their re-point is **the same class as E-2's move** —
a pin whose referent moved with this unit's own census — and is licensed on the register's own declared convention,
with the superseded digest kept awake and asserted distinct wherever the register already does that. A pin's exact
64-hex equality is never relaxed (D-11, D-15; measured by the L2 examiner at `d52cd13`).

**Two comment figures this unit's own move falsified**, and only these: `src/main/security.ts:13-16` ("`VALID_GROUPS`
STAYS AT FIVE", now false beside the sixth group's own rows) and `tests/focus-tool.test.ts:99` ("the 22nd `ALL_TOOLS`
member"). Both are corrected in this unit by the same writer, because a comment that contradicts the count three lines
below it is the stale figure the re-grain exists to prevent — and for no other comment is the E-1 no-sweep clause
lifted (D-11).

**Red before green holds for both.** E-2's rows go red the moment E-1's numbers move and are green only when the
rows themselves move; a module battery row is red before its implementation exists (D-1 §4, `examiner.md` §3).

## 4. The numbers as this unit must leave them (D-11, D-15)

| Reading | Before | After |
|---|---|---|
| `ALL_TOOLS` | 22 | **27** |
| `RpcMethod` | 22 | **27** |
| gate groups (`VALID_GROUPS`, both live copies) | 5 | **6** — `read`, `dispatch`, `graph`, `code`, `module`, `data` |
| `ALL_RESOURCES` | 3 | **3**, unmoved (ASM-10) |
| the default-grant registered subset | 8 | **8**, unmoved — `['read','dispatch']` |
| names listed with `data` enabled | — | **13** |
| the store's written names | — | **one new** (D-13; §5) |

A count that moves without its row moving is a finding (D-11), and a row that moves without a count moving is the
same finding read backwards.

## 5. What the exception does not licence, and what it parks

- **Never the archived corpus.** D-2 archived it as a closed historical record and D-15 says the re-grain runs
  against the live tree only; no archived byte is edited, and no test row repoints into it (D-2, D-15).
- **Never a package.** `provident-storeroom`/`provident-ssr` stay read-only; a defect found there is a finding in
  this unit's record, upstream-owned (D-5).
- **Never a second module's behaviour.** E-1 moves a census; it does not reshape `security.ts`'s gate, the union's
  meaning, resource registration, or `MUTATING_METHODS` (L1 rev 2 §4, ASM-9).
- **Parked: ASM-11's retirement half.** The store's own file is the only *new* written name this unit adds (D-13).
  The one-time import of `<userData>/provident-settings.json` and the retirement of its write site in
  `src/main/main.ts` are **not** delivered here: that path is `app-shell`'s and carries the tier-1 crossing, so
  taking it up would run a second module's contract through one design gate, which D-1 forbids. It is owed to the
  increment that owns the join, and until then C-3's rows move only if the store's file actually reddens them —
  which the §8 predicate decides, not this artifact (D-13, D-1).
- **Parked: nothing else.** The five tools, their five routes, the store's file, the read-only journal and the sixth
  group are this unit's own surface and are claimed paths in `strata/modules.json:64-73` (D-11, D-12).

## 6. How the exception is checked

`strata-lint` run with `--changed` naming exactly the **five** licensed paths — the four E-1 files and E-3's
`src/main/main.ts` — plus the E-2 rows and this unit's own claimed paths (`src/main/storeroom.ts`,
`src/main/data/`, `tests/integration/central-data/`, `tests/unit/central-data/`): a written path outside that list is
a finding against this unit (D-1, `platform.md` §4). The check runs over **module** paths: `docs/L1/`,
`docs/L2/central-data/` and `docs/L3/central-data/` are layer write scopes that no module row may claim, so naming
them in `--changed` fails diff scope by the map's own shape and is not a work finding (L1 rev 2 §2; `modules.md` §1).
The lens the lint cannot supply is the one that matters here — that E-1 changed a census and not a behaviour, and that
E-3 moved one line and not a boot — so the module's examiner reads the five files as code, not as a list (D-1,
`examiner.md` §1).

## 7. Findings this pass surfaced, and where they go

- **`provident-storeroom`: `delete` at an address where no row stands throws `AddressNotFound`** rather than
  answering the empty removal a caller's own receipt would carry; reproduced by this unit's L2 examiner at `57c5825`
  at both the whole-target and the `file`-tier spellings, and `tiers: []` is reachable only where the address stands
  at another tier (suspected root cause: the delete arm treats an absent target as a malformed address rather than
  as a no-op; proposed fix shape: answer `{tiers: []}`, no journal entry, and no throw). Upstream-owned, never
  patched, filed in this unit's record and archived with it (D-5).
- **`provident-storeroom`: the boot over non-image bytes has no declared arm.** Measured: a foreign, unparsable
  image boots cold with its bytes untouched until the next `file`-tier save, so the consumer can state the recovery
  but the package does not declare it (requirement gap, same disposition) (D-5).
- **Owed to the unit's record under `strata/records/`** — both findings above, the L2 examiner's reading, and the
  parked ASM-11 half (§5). L1's write scope is `docs/L1/`, so the record is owed by the layer that owns it and is
  named here rather than written here (D-1 §3, D-5).
