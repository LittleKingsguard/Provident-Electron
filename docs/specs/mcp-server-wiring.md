# Spec — A1 Wiring: SecurityGate in the MCP server (Unit: A1-W2)

Status: **SPEC** (delegation gate for the A1-wiring TDD unit). Source:
`docs/specs/mcp-security.md` §6, `docs/specs/mcp-security-gate.md`,
`docs/specs/architecture-review.md` A1. Binds the pure `SecurityGate` (already
landed + hardened) into the MCP server's tool registration + the HTTP token
check, and adds the manual-UI settings IPC.

## 1. Scope

`src/main/security.ts` has the `SecurityGate`. `src/main/mcp-server.ts`
registers the tools. This unit:

1. **Tool registration** — a tool is REGISTERED only if its group is enabled
   (`gate.toolAllowed(name)`). A disabled group ⇒ the tool is not registered
   (and not listed / not callable). The `provident` prefix is part of the name
   (e.g. `provident.dispatch`).
2. **HTTP token gate** — the HTTP transport calls `gate.checkRequest(headers)`
   on every `/mcp` POST/GET; a failed check ⇒ `401` with a JSON-RPC error,
   BEFORE any tool runs. stdio is NOT token-gated (spawn-local; the manual
   grant + group gating is the stdio control).
3. **Settings IPC** — `provident:security:get` / `provident:security:set`
   (main ↔ renderer, manual-UI-only) read/apply the gate config. Applying a
   patch re-derives the enabled-tool registration (the running server's tools
   change).

## 2. The surface (testable core — no Electron)

```ts
// src/main/mcp-server.ts (new, pure, no Electron)
export function toolForName(name: string): string   // 'provident.dispatch' → 'dispatch' (the registration name)
export function registeredToolNames(gate: SecurityGate, allNames: string[]): string[]
```

- `toolForName('provident.dispatch')` → `'dispatch'`; `toolForName('nope')` →
  throws (a registered tool must be under the `provident.` prefix).
  `toolForName('provident.nope')` → `'nope'` (the prefix is stripped; whether
  `provident.nope` is a KNOWN tool is `registeredToolNames`'s concern — an
  unknown name returns null from `groupForTool` and is never registered).
- `registeredToolNames(gate, allNames)` → the subset of `allNames` whose group
  is allowed. The `allNames` is the full tool-name list (the `provident.`-
  prefixed names); it uses `gate.toolAllowed(name)`.

## 3. The gate decisions (states)

- Default gate (`read`+`dispatch`): `registeredToolNames(gate, ALL)` includes
  `provident.dispatch`, `provident.get_rendered_html`, `provident.list_targets`,
  `provident.get_node_state`, `provident.code.get`, `provident.code.validate`
  (the `read`/`dispatch` groups); EXCLUDES `provident.load`, `provident.op`,
  `provident.export`, `provident.validate`, `provident.teardown` (`graph`),
  `provident.code.set/create/delete/load` (`code`).
- Enabling `graph`/`code` via `gate.apply` ⇒ the corresponding tools register.
- A tool whose group is allowed but which is unknown to the map ⇒ never
  registers.

## 4. The HTTP 401 contract

`httpAuthorized(gate, headers)` → `boolean` = `gate.checkRequest(headers).ok`.
When it returns `false`, the HTTP handler MUST return 401 before touching any
tool. When the gate has no token (`token:null`), `checkRequest({})` is `true`.

## 5. Verify (the TestWriter's exact states)

- `toolForName('provident.dispatch')` → `'dispatch'`; `toolForName('unknown')`
  → throws.
- `registeredToolNames(defaultGate, ALL)` = the `read`+`dispatch` set (5 tools:
  dispatch + get_rendered_html + list_targets + get_node_state + code.get +
  code.validate → count them per the §3 list) and NOT graph/code tools.
- `registeredToolNames(defaultGate.apply({groups:['graph','code']}), ALL)` ⇒
  all the graph + code tools are now included.
- `httpAuthorized(gateWithNoToken, {})` → `true`.
- `httpAuthorized(gateWithToken('s'), {authorization:'Bearer s'})` → `true`;
  `{authorization:'Bearer wrong'}` → `false`.
- The full tool list `ALL` covers every tool the MCP server will register (the
  current 4 + the planned graph/code tools).
