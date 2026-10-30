# L2 — `settings-carrier-retirement`: the interface

- **Layer:** L2 · **Unit:** `settings-carrier-retirement` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — `tests/integration/settings-carrier-retirement/` is filed against this file and stands red until `src/main/operator-settings/` and `src/main/settings-surface/` carry the verbs this file declares (D-1, `examiner.md` §3)
- **Inputs:** `docs/L1/settings-carrier-retirement.md` §2–§9 (authoritative for this unit's design; this file declares the surface that design needs and **re-derives none of it**); D-5, D-10, D-13, D-14, D-16…D-22; `docs/L2/security-store-storeroom/interface.md` §1/§2/§2.1/§3/§5 (the sibling unit's surface, extended here and never re-spelled); `strata/modules.json:44-72` (`operator-settings` **12**, `settings-surface` **19**); the tree at `e3b59d5`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md` and **the declaration** is its `index.d.ts`; both are read and never edited (D-5)

## 0. Scope, and what this document does not fix

Two modules' I/O surface and nothing beneath it: `src/main/operator-settings/` gains a third durable address and two verbs (D-22, L1 §3), and `src/main/settings-surface/` delegates those two verbs to `src/main/main.ts` (D-21, L1 §9 E-2/E-3). No structure, no private helper and no file layout: `docs/L3/settings-carrier-retirement/` owns those (D-1). No MCP tool, resource, `RpcMethod` member, bridge channel or rendered element is added, removed or renamed — the two store channels keep their names, their `invoke` sites and their answer shapes (D-18, L1 §2/§9). The gate's exclusion/tier-4 enforcement and the module registry's own code do not move (D-22).

## 1. The third durable address, and the two verbs that serve it

The retired carrier's rows live at **`['operator-app-state']` on the `file` tier**, beside `['operator-settings']` and not inside its value (L1 §3 ASM-1; D-18). The separation is structural: a `file`-tier write purges the versions it outranks **at its own key** (`guide §5.1`), so a module-tool write can never compose a value carrying the token (D-18, L1 §3 ASM-1).

| Address | Tier | What stands there | Written by |
|---|---|---|---|
| `['operator-settings']` | `file` | the security record, whole (sibling §1) | `write`, unchanged (D-16) |
| `['operator-exclusion']` | `mem` | `{exclusion}`, never persisted (sibling §1) | `write`, unchanged (D-17) |
| **`['operator-app-state']`** | `file` | `{rows}` — the carrier's rows, **whole** (L1 §3) | **`writeAppState`**, one commit per act (D-22) |

- **Read and write are whole-record acts.** One `writeAppState` is one store write, one op, one cursor and one receipt, because the rows are one value at one address (L1 §3; `guide §4` arm `W-4`).
- **The rows cross as an ordered list, never as a map** — `AppStateRow[]`, order preserved (`A-2`). The retired record's key order is the order the carrier held, and nothing in this unit is entitled to re-sort it (L1 §3).
- **The record's value is `{ rows }`** — one declared member, so the read-back validates a shape rather than serving any object that happens to stand at the address (L1 §3; D-13).

## 2. `src/main/operator-settings/index.ts` — the declared delta

Everything the sibling unit declares stands, unchanged and unrepeated (sibling §2/§2.1/§3). This unit adds **two value names** and one receipt-shaped answer (L1 §2; D-14).

```ts
export interface AppStateRow { name: string; value: unknown }            // name verbatim, order preserved
export type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'
export interface AppStateAnswer {
  rows: AppStateRow[]                       // the records rows, or the import overlay, or []
  legacy: AppStateLegacy                    // the import arms answer, a boot-time diagnosis
  unrepresentable: string[]                 // names the import could not carry, answered by name
  storage: 'standing' | 'unreachable'       // the refused construction, as a read (ASM-L2-3)
}
export interface OperatorSettings {
  read(): OperatorSettingsRecord                                    // sibling §2, unmoved
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt       // sibling §2, unmoved
  subscribe(listener: OperatorSettingsListener): () => void          // sibling §2, unmoved
  readAppState(): AppStateAnswer                                    // NEW
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt   // NEW, one receipt
}
```

- **`writeAppState` answers the sibling's own receipt type** — committed with the store's `cursor`/`opId` verbatim, or refused with the store's `reason`, `message` and `address` verbatim (sibling §3; L1 §3 ASM-2). No second receipt vocabulary exists (D-16).
- **`writeAppState` never throws**, for any argument: every caught value is contained and answered as a refusal (sibling §2; L1 §3).
- **`readAppState` moves nothing and serves detached rows**, at every depth (`guide §10`; sibling §2). `storage:'unreachable'` is served when the store's construction refused, so no vertex of this module reads `FilePathUnreachable` as a throw (sibling §2.1; `guide §8.2`).
- **`legacy` is a boot-time diagnosis served for the process's life and never written** (L1 §4 ASM-4): `'absent'`, `'imported'`, `'corrupt'` are §4's three arms, and **`'recorded'` is the arm L1 §4 now names as `recorded`** — a record stood at the address, so no import arm applied (`ASM-L2-1`).
- **`N = 12`**: the sibling's 10 (6 package exports called + 4 value names) plus these two (L1 §2; `platform.md` §4). Types move no figure (`A-3`).

## 3. `src/main/settings-surface/index.ts` — the declared delta

The surface gains **two verbs and nothing else**: it delegates the two above and maps `legacy`/`unrepresentable`/`storage` through unchanged (L1 §9 E-3; D-21).

```ts
export type SettingsAppStateRow = AppStateRow
export type SettingsLegacyAnswer = AppStateLegacy
export interface SettingsAppStateAnswer {
  rows: SettingsAppStateRow[]; legacy: SettingsLegacyAnswer
  unrepresentable: string[]; storage: 'standing' | 'unreachable'
}
export type SettingsCommitAnswer =
  | { status: 'committed' }
  | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }
export interface SettingsSurface {
  read(): SettingsReadAnswer; set(patch: SettingsPatch): SettingsSetAnswer      // sibling §5, unmoved
  transition(state: unknown): SettingsTransitionAnswer; attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer                              // NEW — delegates readAppState
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer   // NEW — delegates writeAppState
}
```

- **`state()` and `commit(rows)` are the only two additions**, so the surface's `N` moves `15 → 19`: two exposed and two consumed, both sides counted (L1 §2; D-14; `platform.md` §4).
- **`commit`'s committed arm is exactly `{status:'committed'}`** — no `cursor`, no `opId` — because that is the landed answer of the channel it serves and `preload.ts` is byte-identical after this unit (L1 §9; `src/main/preload.ts:72`; `ASM-L2-4`).
- **The refused arm carries the store's own status verbatim** as `reason`, with `message` and `address` beside it (L1 §3 ASM-2; sibling §3). `'malformed-payload'` is **not** a store status: it stays the channel's own pre-write refusal and never enters this module (§4).
- **Neither verb composes, filters, sorts or validates a name or a value**: composition is `main.ts`'s (`ASM-L2-5`, L1 §3). The one exception is the argument's own shape, refused as a value (§6).

## 4. The two channel bodies `src/main/main.ts` now calls

Each handler keeps its channel name, its registration site and its answer shape; only its body's source changes (L1 §3; `src/main/store-channels.ts` unmoved).

| Channel | Body | Answer |
|---|---|---|
| `STORE_FILE_GET` (Y-1) | one `settingsSurface.state()`, projected to `{name, value}[]` | the rows in their committed order; **`[]`** over a cold tier, over a corrupt import arm and over a refused construction — never a throw (L1 §3; `behaviour.md` §2) |
| `STORE_FILE_PUT` (Y-2) | the landed validation, the landed `file.*` projection, then **one** `settingsSurface.commit(rows)` | `{status:'committed'}`, or `{status:'refused', reason}` where `reason` is `'malformed-payload'` (pre-write) or **the store's own status verbatim** (post-projection) (L1 §3 ASM-2; `behaviour.md` §3) |

- **Y-1 holds no holder.** The retired third holder is gone, so a second Y-1 in one realm re-serves the current record from the instance and reads no file (L1 §3; `behaviour.md` §1).
- **Y-2 is a whole-map replacement**: the projection of every `file.*` key of that crossing **is** the record, as it is today, so a crossing that carries one `file.*` row leaves one row standing (L1 §3; `behaviour.md` §3 `A-6`).
- **The `schemaVersion` stamp is gone** from both bodies: it is the retired record's format marker, not operator state, and the instance's shape carries none (L1 §3/§4; D-13).

## 5. The module surface's three re-pointed writes and three reads

`moduleSurface` keeps its seven members, its answers, its hash re-verification, its `reserved-namespace` refusal and its quarantine (D-22; L1 §1). Only its **source of rows** moves (L1 §3).

| Member | Its rows come from | Its write |
|---|---|---|
| `get(name)`, `list()` | `settingsSurface.state().rows`, filtered on `file.modules.` (L1 §3) | — |
| `status()` | the same rows | — ; `corrupt` is `legacy === 'corrupt' \|\| storage === 'unreachable'` (L1 §3; ASM-L2-3) |
| `put`, `remove`, `setDisabled` | the same rows | **one** `settingsSurface.commit(rows)` of the newly composed whole map (L1 §3) |
| the Q-5 migration's step (3) | `state().rows` plus the legacy registry's records | **the same one** `commit(rows)` (L1 §3) |

- **Each member answers exactly what it answers today**: `put` returns the record it composed, `remove` answers whether the row stood, `setDisabled` answers nothing, and **none of the three surfaces the commit's receipt** — its answer is the channel's, and a member's answer is not a channel (L1 §3; `ASM-L2-5`).
- **No member composes a `schemaVersion`**: the stamp retires with its record (L1 §3; D-13).
- **The legacy registry read and its post-boot removal are unmoved** — `provident-modules.json` is read by `module-store.ts` and `rmSync`-removed after the migration's one write (L1 §3; `src/main/main.ts`'s `createModuleStore` read of `provident-modules.json` and the `rmSync` that follows the migration's one commit).

## 6. The refusal vocabulary, as it reaches a caller

| Answer site | The closed/open set it carries | Cite |
|---|---|---|
| `commit` / `writeAppState` | the sibling's open reason set — the store's `Status` verbatim, plus the sibling's three named spellings (`ValueRefusedAtBoundary`, `FileCommitFailed`, `FilePathUnreachable`) | sibling §3; `guide §8`, §8.1; L1 §3 ASM-2 |
| Y-2 | `'malformed-payload'` (the channel's own pre-write refusal, unchanged) **or** the store's status verbatim | L1 §3 ASM-2 |
| `commit` over a malformed argument | `{status:'refused', reason:'ValueRefusedAtBoundary', …}` with this module's own sentence — a duplicate `name`, a `name` that is not a non-empty string, a row that is not an object, or a `rows` that is not an array | `ASM-L2-6`; `guide §8` |
| `state()` over a refused construction | no refusal: the read answers `[]` and `storage:'unreachable'` | sibling §2.1; `ASM-L2-3` |

- **A refusal leaves the record and the bytes exactly as they stood, mints no cursor and adds no change** (L1 §3; `guide §9.4`; sibling §3).
- **The renderer's own declaration is narrower than the runtime vocabulary** and this unit does not move it: `preload.ts:72` declares `reason?: 'malformed-payload' | 'write-failed'`, the renderer branches on `status` alone (`src/renderer/renderer.ts:1312`), and the widening is **owed** to the unit that next touches the bridge (`persistence.md` §8).

## 7. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| `A-1` | the two new verbs are named `readAppState`/`writeAppState` on the instance and `state`/`commit` on the surface | reusing `read`/`write` with a second patch domain, which puts two tiers and a whole-map record in one verb and breaks the sibling's "a patch names one tier" rule (sibling §1) |
| `A-2` | rows cross as an ordered `AppStateRow[]` | a `Record<string, unknown>`, which needs the null-prototype discipline for operator-controlled names and loses the order the retired record held (L1 §3) |
| `A-3` | types move no `N`, so the two verbs are the whole census delta (12 and 19) | counting the four new type names, which sets a cap off type aliases (D-14; sibling `A-4`) |
| `ASM-L2-1` | `legacy` has a fourth word, `'recorded'` | reporting `'absent'` over a profile whose record stands, which is false and would let the parity row pass on a lost record (L1 §5) |
| `ASM-L2-2` | the value that crosses to the store is the rows' **JSON image** (`JSON.stringify`/`JSON.parse`), because that image is the record the retired carrier held and served | crossing the live row objects, where an own `undefined` member refuses the whole value and the Q-5 migration's `quarantined: undefined` would refuse the first migration write (`guide §10.2`; `persistence.md` §3) |
| `ASM-L2-3` | the refused construction is a **read** member (`storage`), and `corrupt` is its OR with `legacy === 'corrupt'` | folding it into `legacy:'corrupt'`, which reports a disk fault as a bad legacy file (L1 §3; sibling §2.1) |
| `ASM-L2-4` | `commit`'s committed arm carries no ordinal (§3) | carrying `cursor`/`opId` through the channel, which reshapes a bridge answer `preload.ts` declares and L1 §9 holds byte-identical |
| `ASM-L2-5` | `main.ts` composes every rows map; neither new verb validates a name or a value | validating `file.` prefixes inside the instance, which makes the state engine a consumer's policy owner and re-implements a consumer (D-22) |
| `ASM-L2-6` | a malformed `rows` argument is refused as a value, never thrown | last-name-wins over a duplicate, which silently discards an operator row (L1 §4's own rule, extended to the write) |

## 8. The integration battery's surface

Each row is one goal → one observable outcome, and the battery is **evidence**, so it counts against neither harness cap (D-14; L1 §2). `app-state.test.ts` carries the third address, the commit and its refusals, the JSON-image boundary and the two-address non-interference; `import.test.ts` carries L1 §4's four arms with the retired file's bytes hashed; `surface.test.ts` carries the two delegating verbs, the answer shape the two channel bodies mint from those rows, `storage:'unreachable'`, the copy discipline, and **boot parity by a second construction** (L1 §5); `retirement.test.ts` carries the retirement's absences, the census and `ISO-7` (L1 §6–§8; `examiner.md` §2). **No row drives a channel body**: both bodies live in `src/main/main.ts`, which imports `electron` at module scope and is unimportable in a node test, so what this battery drives is the declared surface those bodies call and the shape they mint from it — L1's e2e `S-2`/`S-8`/`S-9` drive the bodies themselves on a booted app (`behaviour.md` §2/§3). `ISO-7`'s live limb drives the whole-map commit the three module members issue, and says in its own message that the members themselves are unimportable, which is what L1's e2e `S-12` covers.
