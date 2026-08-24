# Mapping — MCP Security (Unit A1)

- **Tool Registration & Permissions**:
  - `src/main/security.ts:131` (`SecurityGate` class): Pure logic for tool group permissions and request authorization.
  - `src/main/security.ts:148` (`toolAllowed`): Checks if a specific tool's group is enabled in the gate.
  - `src/main/security.ts:152` (`checkRequest`): Validates HTTP requests against the security token.
  - `src/main/security.ts:158` (`apply`): Implements immutable patching of the security configuration.
