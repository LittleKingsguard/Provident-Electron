# L3 — `app-shell`: the declared signatures — the tenth member, its channel, the role vocabulary, and the delivery queue

- **Layer:** L3 · **Unit:** `app-layout` · **Artifact:** `l3-app-shell-signatures` · **Branch:** `strata` (D-6) · **Rev:** 2 — **THE DELIVERY QUEUE, ITS THREE MEMBERS, AND THE LISTENER ENTRY THIS FILE CONSUMES AND NEVER DECLARES** (`docs/L3/app-shell/delivery.md` §3, §6): §5 is new, §1's census is **unmoved** (the queue is `main()`'s private and crosses no bridge), and **no member, route, channel or type above §5 moves a byte** — the delta is one interface, one factory and one consumed element shape, all of them `main()`'s own (`D-219`, `D-218`). Rev 1 — **THIS PAGE WAS NEW**: `docs/L3/app-shell/signatures.md` did not exist, and rev 4's `G-7` declined one because the drag pair minted no signature of its own (the two members were the five commits' text verbatim). **This pass mints one member, one channel constant and one role vocabulary — and `docs/L2/app-shell/interface.md` rev 5 §2's `OWED-1` separately hands the unmoved `view` block's exact text DOWN to `docs/L3/`**, so both have a carrier here (`design.md` §4, D-45).
- **Status:** DECLARED NAMES AND EXACT TEXT ONLY — every name this landing exposes or consumes is here; the structure, the hunks and the guardrails are `design.md`'s (D-3, D-45). **No type, no export and no new file is minted**: the answer is spelled inline at both preload sites and the two role sets are private to `main()` (`design.md` §4's `ASM-L3-1`/`ASM-L3-2`).
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `L2 §n` is `docs/L2/app-shell/interface.md`'s, `G-n` is `design.md` §8's, `ASM-n` is `design.md` §10's, `OWED-n` is `design.md` §9's; a cite into `src/**` names the **site** and never an offset (D-41).

## 1. The module's published surface — the bridge's TEN members, in order

| # | Member | Routes | Kind | What answers it |
|---|---|---|---|---|
| 1–4 | `ready` · `onRequest` · `sendReply` · `notify` | 1 each | signal · delivery in · reply · reply | `IPC_READY`; `IPC_INVOKE`; `IPC_REPLY`; `IPC_NOTIFY` |
| 5 | `security` | 5 | 4 request + 1 delivery | `IPC_SECURITY_GET`/`_SET`, `IPC_SECURITY_EXCLUSION`, `IPC_SECURITY_PANE`; `IPC_SECURITY_CHANGED` |
| 6 | `module` | 3 | 2 request + 1 delivery | `IPC_MODULE_GET`, `IPC_MODULE_SET_DISABLED`; `IPC_MODULE_CHANGED` |
| 7 | `tabs` | 4 | 3 request + 1 delivery | `IPC_TABS_READ`/`_COMMIT`/`_REMOVE`; `IPC_TABS_CHANGED` |
| 8 | `view` | 7 | 6 request + 1 delivery | the six `IPC_VIEW_*`; `IPC_VIEW_CHANGED` |
| 9 | `data` | 5 | 5 request, no delivery | the five `IPC_DATA_*` |
| **10** | **`menu` (NEW)** | **1** | **1 request, NO delivery and NO address** | **one channel constant (§2c), one `ipcMain.handle` admitting ELEVEN and refusing SEVEN (§3)** |

- **The census: `9 → 10` members, `28 → 29` routes** — counted here and nowhere carried: the four base members, `security` 5, `module` 3, `tabs` 4, `view` 7 and `data` 5 are **28** today, and `menu`'s one route makes **29** (a recountable figure, `D-26`/`D-43`). **The map's `app-shell` `endpoints` stays `8`**: the route the map counts was already this unit's, taken at L1 rev 2.
- **The nine existing members' text is NOT copied here** (only `view`'s, below): their authority is `src/main/preload.ts` against `src/renderer/secure-panels.ts`'s `declare global`, and this unit moves no byte of theirs (`G-1`). **`view`'s SEVEN lines are carried because `L2 §2`'s `OWED-1` handed them down and they would otherwise have no home in `docs/L3/`** — they are **UNMOVED** by this pass and are re-printed exactly as `preload.ts`'s `ProvidentBridge.view` declares them:

```ts
    read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
    commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    onChanged(handler: () => void): () => void
```

- **A `menu` member at ONE half reds nothing**, and that is why `OWED-3` is named rather than discovered: `store-view-record`'s comparison row reads **the `view` block alone**, member for member and in order, so the absent `secure-panels.ts` copy is a silent gap and never a typecheck red (`D-112`, `G-1`).
- **AND NO ROW COMPARES THIS PAGE — SAID HERE RATHER THAN IMPLIED** (`D-45`): the three census rows compare `preload.ts`'s interface to their own literals, and `AS-3` reads `preload.ts`, not this file. So the SET has a witness and the **text** has none for `menu` (for `view` it is the comparison row's, on the two `src/` halves). The alternative — keeping no block — was refused because `L2 §2`'s `OWED-1` asks for the `view` text and nothing else in `docs/` holds it; the guard is that this page is **REPLACED on revision and re-read at every landing** (`D-1`, `D-2`), never annotated.

## 2. `menu` — the exact text at the four sites `design.md` §4 lands

**(a) THE DECLARATION** — `src/main/preload.ts`, `ProvidentBridge`, **after `data`'s closing `},` and before the `store` headstone comment**, **TWO spaces' indent** — the level `ready` and `data: {` stand at, and the only one the three census scans see (`^ {2}(\w+)(?:\(|:)`; a four-space member is invisible to all three) — ONE line:

```ts
  menu(role: string): Promise<{ status: 'admitted'; role: string } | { status: 'refused'; role: string; reason: 'role-not-admitted' | 'role-unknown' | 'role-malformed'; message: string }>
```

**(b) THE ARM** — the bridge object's `menu`, **the same slot**, **TWO spaces' indent** for the signature line and `},`, FOUR for the returned call — the shape `data`'s five arms carry (`D-112`); the signature line is (a)'s **verbatim**, and its two remaining lines are `src/main/preload.ts`'s own commit form (L2 §2):

```ts
    return ipcRenderer.invoke(IPC_MENU_ROLE, role)
  },
```

**(c) THE CHANNEL CONSTANT** — `src/main/store-channels.ts`, appended after `IPC_SECURITY_PANE`; the file holds channel names and NOTHING else, and **its own census annotation moves `2 → 3` in the same edit**:

```ts
/** **THE MENU'S ROLE ROUTE** (`D-181`; `docs/L2/app-shell/interface.md` §5). The third constant in a file that holds channel
 *  names and nothing else, for its two siblings' reason: an ADDRESS that must not be spelled in `src/shared/types.ts`, the
 *  file the MCP-reachable stack imports (`D-123`, `ISO-5`/`ISO-6`). It reaches `main.ts`'s handler and `preload.ts`'s `menu`
 *  member by IMPORT from this file and is never re-spelled. **THE FILE'S CENSUS MOVES `2 → 3`** and no other member joins. */
export const IPC_MENU_ROLE = 'provident:menu:role'
```

**(d) THE HANDLER SITE** — `src/main/main.ts`, `main()`, **after the `module` handler block and before the stdio-transport block**; it spells `_event` and reads neither it nor a sender (`G-3`):

```ts
  ipcMain.handle(IPC_MENU_ROLE, (_event, role: unknown) => menuRoleAnswer(role))
```

- **`menuRoleAnswer`'s signature**: `(role: unknown) => { status: 'admitted'; role: string } | { status: 'refused'; role: string; reason: 'role-not-admitted' | 'role-unknown' | 'role-malformed'; message: string }` — **private to `main()`, not exported, its body `design.md` §3's `R1`–`R4`**, and **it calls nothing**: an admitted role is admitted, never executed (`OWED-1`, `G-5`).
- **The answer is a plain object of strings and booleans** — no class, no getter, no function member — because it crosses `contextBridge` in one `ipcRenderer.invoke` round trip, the shape every sibling route answers (`D-112`, `D-101`'s refusal vocabulary). **What turns it into the carrier's `content` is NOT this page's**: `renderer-wiring`'s `startMenusItems` writes it as a `state-slice` `content`, and the stringification is that turn's (`docs/L2/renderer-wiring/interface.md` §2 turn 4).

## 3. The role vocabulary — two literals, disjoint, total over `D-181`'s EIGHTEEN

Landed in `main()` beside the total function, in this order, **`as const` and no derivation** (`G-4`; `zoom` is refused while `zoomin`/`zoomout` are admitted, and `selectall` is one word):

```ts
  const MENU_ADMITTED_ROLES = ['undo', 'redo', 'cut', 'copy', 'paste', 'delete', 'selectall', 'resetzoom', 'zoomin', 'zoomout', 'togglefullscreen'] as const   // ELEVEN
  const MENU_REFUSED_ROLES = ['quit', 'close', 'reload', 'forcereload', 'toggledevtools', 'minimize', 'zoom'] as const                                          // SEVEN
```

| | the answer | which arm |
|---|---|---|
| one of the eleven | `{status: 'admitted', role}` | `R3` — the receipt names the role it admitted, and **claims no effect** (`ASM-L3-4`) |
| one of the seven | `{status: 'refused', role, reason: 'role-not-admitted', message}` | `R2` — refused BY NAME, a value and never a throw |
| neither | `{status: 'refused', role, reason: 'role-unknown', message}` | `R4` — `AL-11`'s first arm, never silent |
| not a string | `{status: 'refused', role: '', reason: 'role-malformed', message}`, the message naming what arrived | `R1` — `AL-11`'s second arm, never a throw |

## 4. What is NOT declared, and why each absence is deliberate

| Absent | Why |
|---|---|
| a named answer type, any export | the five commits' precedent and `ASM-L3-2`: a type is a third spelling the census rows cannot see — the `main/`-into-renderer import itself is lawful (`src/renderer/secure-panels.ts` already imports four `main/` types, measured) |
| a new `src/` file (a `menu-roles` module) | `ASM-L3-1`: it would need a map `paths` row and an L1 pass before L4 could land, and `pins`' `srcTypeScriptFiles` (`51`) would move for a table the e2e battery drives anyway |
| a sender guard (`permitted(`, `senderFrame`, a read `_event`) | `G-3`, `D-121`: the admitted set is the bound, and a guard here would make this crossing stricter than every sibling handler |
| any accelerator, `globalShortcut` or key listener | `C-6`: the lost ten are a stated cost and a later unit's surface (`design.md` §2) |
| a window IPC channel or an authored control | `D-178` §2, `C-1`: the three buttons are the platform's, and `D-121`'s authored arm was never landed |

## 5. The delivery queue — one interface, one factory, and the element this file consumes (rev 2, `delivery.md` §3–§6)

**PRIVATE TO `main()`'s MODULE AND EXPORTED NOWHERE** (`delivery.md` `G-7`, `ASM-L3-6`): no bridge member, no channel, no `src/` file, no map row, no `endpoints` move. **It is a queue of ADDRESSES and never of readings** (`D-92`).

```ts
interface DeliveryQueue {
  /** THE LISTENER'S WHOLE ACT: the delivered ADDRESS — never a value, never a read (D-92). Total: it throws at no argument. */
  deliver(address: readonly string[]): void
  /** THE REALM HAS ARRIVED: one push for this crossing, then `held` is dropped. Idempotent within a realm, re-armed by the next arrival. */
  arm(): void
  /** WHAT WAS DELIVERED WITH NO DESTINATION — the creation's evidence, a reading for a battery and never a destination. */
  readonly held: readonly (readonly string[])[]
}
function createDeliveryQueue(push: () => void): DeliveryQueue
```

- **`push` IS THE CROSSING'S EXISTING FAN-OUT LOOP, HOISTED AND UNCHANGED IN BODY** — `for (const win of BrowserWindow.getAllWindows()) if (!win.isDestroyed()) win.webContents.send(IPC_*_CHANGED)` — so `deliver` and the runtime path send the same signal and a consumer cannot tell a creation's delivery from a write's (`delivery.md` §3, `D-92`).
- **THE ELEMENT THIS FILE CONSUMES AND NEVER DECLARES** (each crossing's own page owns its text — `docs/L3/view-record/delivery.md` §2, `docs/L3/store-tabs-record/delivery.md` §2; `D-3`):

```ts
  { readonly address: readonly string[]; readonly handle: string; readonly listener: (address: readonly string[]) => void }
```

  **`LISTENER` IS REQUIRED AND IS NEVER A NO-OP**: a two-member element is refused `AddressMalformed` (subject `listeners`) **before any filesystem act**, and `listener: () => {}` — the package's own migration route — is **refused by this design** as a row that cannot fail (`guide §6`, `:553`–`:563`; `delivery.md` `G-1`).
- **THE TWO BUILDERS, AS THIS FILE CALLS THEM** — the crossings declare them beside their constraint and root declarations (`delivery.md` `ASM-L3-9`):

```ts
  createTabsDelivery(sink: (address: readonly string[]) => void): { readonly entries: readonly { readonly address: readonly string[]; readonly handle: string; readonly listener: (address: readonly string[]) => void }[]; subscribe(handler: () => void): () => void }
  createViewDelivery(sink: (address: readonly string[]) => void): { readonly entries: readonly { readonly address: readonly string[]; readonly handle: string; readonly listener: (address: readonly string[]) => void }[]; subscribe(handler: () => void): () => void }
```

- **THE ELEMENT SHAPE IS SPELLED INLINE AT THESE TWO LINES AND NO NAMED TYPE IS MINTED HERE** (`ASM-L3-2`'s rule read one subject over): a type declared in this file would be a THIRD spelling beside each crossing's own entry builder and the package's `StoreConfig`, and no row reads it. **This file consumes the shape; it does not own it** (`D-45`, `D-3`).

- **THE ONE SITE THAT CONSUMES THEM** — `src/main/main.ts`, `createProfileStore({`, where `constraints:` already spreads (`delivery.md` §5 `A-3`); the order is tabs-then-view and `constraints:` does not move:

```ts
      listeners: [...tabsDelivery.entries, ...viewDelivery.entries],
```

- **AND NOTHING ELSE IS DECLARED HERE**: no answer type, no exported symbol, no second spelling of an address — **the four view roots and the one tabs root are the crossings' and `main.ts` names none of them** (`delivery.md` `G-5`, `D-53`, `D-101`).
